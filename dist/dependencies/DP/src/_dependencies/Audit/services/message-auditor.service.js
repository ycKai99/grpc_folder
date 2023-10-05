"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAuditorService = void 0;
const rxjs_1 = require("rxjs");
const export_1 = require("../dependencies/log/interface/export");
const lodash_1 = require("lodash");
class MessageAuditorService {
    constructor() {
        this.sourceSrc = new export_1.LoggingService();
        this.targetSrc = new export_1.LoggingService();
        this.missingMessageSubject = new rxjs_1.Subject();
    }
    init(settings, filters) {
        this.settings = settings;
        if (filters) {
            console.log(`Integrating filters: ${Object.keys(this.filter)} in AuditMessage service`);
            this.filter = filters;
        }
    }
    subscribe(obsTrigger) {
        obsTrigger.subscribe({
            next: obsTrigger => {
                console.log(obsTrigger.message);
                if (!this.filter) {
                    console.log(`No filter applies`);
                }
                else {
                    console.log(`Synchronizating with filters: ${Object.keys(this.filter)}: ${Object.values(this.filter)}`);
                }
                let missingMsg = this.synchronize();
                missingMsg.subscribe({
                    next: element => {
                        this.missingMessageSubject.next(element);
                        console.log(`AuditService: Returning missing messages ${element.appData.msgId} ....`);
                    }
                });
            }
        });
        return this.missingMessageSubject;
    }
    filterData(filters, message) {
        let response = true;
        let payload = JSON.parse(message.appData.msgPayload);
        function checkValues(filter) {
            let key = Object.keys(filter);
            console.log(Object.values(filter));
            let value = Object.values(filter)[0];
            let res = lodash_1._.get(payload, key[0]);
            if (lodash_1._.has(payload, key[0])) {
                let strarray;
                if (Array.isArray(value)) {
                    strarray = value;
                }
                else {
                    strarray = [value];
                }
                if (strarray.includes(res)) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                console.log(`${key} does not exists in payload`);
                return false;
            }
        }
        if (filters) {
            if (Object.keys(filters).length > 1) {
                let totalCount = Object.keys(filters).length;
                let matchedCount = 0;
                Object.entries(filters).forEach(([key, value]) => {
                    let filter = { [key]: value };
                    if (checkValues(filter) == true)
                        matchedCount++;
                });
                if (totalCount == matchedCount) {
                    response = true;
                }
                else {
                    response = false;
                }
            }
            else {
                if (checkValues(filters) == true) {
                    response = true;
                }
                else {
                    response = false;
                }
            }
        }
        else {
            response = true;
        }
        return response;
    }
    synchronize() {
        let subjectOutput = new rxjs_1.Subject();
        this.acquireData().then((data) => {
            this.checkArrayDifferences(data).then((data) => {
                data.forEach(msgElement => {
                    let refined = JSON.parse(JSON.stringify(msgElement));
                    subjectOutput.next(refined);
                });
            });
        }).catch((e) => console.error(e));
        return subjectOutput;
    }
    async acquireData() {
        const promiseQuery = new Promise((resolve, reject) => {
            let allSets = {
                arr1: [],
                arr2: []
            };
            let set1 = [];
            let set2 = [];
            this.sourceSrc.init(this.settings.incomingSource).then(() => {
                this.targetSrc.init(this.settings.target).then(() => {
                    this.sourceSrc.filter({ msgTag: this.settings.incomingSource.tags[0] }).then((data) => {
                        data.forEach((message) => {
                            if (this.filterData(this.filter, message))
                                set1.push(message);
                        });
                    }).catch((err) => {
                        console.error(err.message);
                    }).then(() => {
                        this.targetSrc.filter({ msgTag: this.settings.target.tags[0] }).then((data) => {
                            data.forEach(message => {
                                if (this.filterData(this.filter, message))
                                    set2.push(message);
                            });
                            allSets.arr1 = set1;
                            allSets.arr2 = set2;
                            resolve(allSets);
                        });
                    });
                });
            });
        });
        return promiseQuery;
    }
    async checkArrayDifferences(args) {
        return new Promise((resolve, reject) => {
            let missingMsg = [];
            args.arr1.forEach((msgElement) => {
                if (args.arr2.some(obj => obj.appData.msgId === msgElement.appData.msgId)) {
                    console.log(`Item Found!`);
                }
                else {
                    console.log(`This ${msgElement.appData.msgId} is missing`);
                    missingMsg.push(msgElement);
                    resolve(missingMsg);
                }
            });
        });
    }
}
exports.MessageAuditorService = MessageAuditorService;
//# sourceMappingURL=message-auditor.service.js.map