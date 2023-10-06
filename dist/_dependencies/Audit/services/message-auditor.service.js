"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAuditorService = void 0;
const rxjs_1 = require("rxjs");
const _ = require("lodash");
const export_1 = require("../dependencies/log/interface/export");
class MessageAuditorService {
    constructor() {
        this.sourceSrc = new export_1.LoggingService();
        this.targetSrc = new export_1.LoggingService();
        this.missingMessageSubject = new rxjs_1.Subject();
    }
    /* Set up the targets or points of synchronization. This is where it will register the 2 different location of
    the data to be synchronized */
    init(settings) {
        this.settings = settings;
        if (settings.filters) {
            console.log(`Integrating filters: ${Object.keys(this.settings.filters)} in AuditMessage service`);
        }
    }
    /* This is the main interface of the message sync service. The argument will take in an observable stream of
    error notifications, prompting it to perform the subscription of the targeted sources and it's corresponding
    target. Essentially, this does not synchronize, but rather it checks against the two sources and compare
    and return the missing data, which will then be passed into the targeted subject stream as specified by the
    respective client. They can choose how they want to handle the missing messages returned. */
    subscribe(obsTrigger) {
        // Subsribe to the errorTrigger obs to listen to any notification.
        obsTrigger.subscribe({
            next: obsTrigger => {
                console.log(obsTrigger.message); // just checking the message
                if (!this.settings.filters) {
                    console.log(`No filters applies`);
                }
                else {
                    console.log(`Synchronizating with filters: '${Object.keys(this.settings.filters)}': '${Object.values(this.settings.filters)}'`);
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
    /* ________________ Private Functions _________________ */
    // Filtering functions to filters out messages
    filterData(filters, message) {
        let response = true; //Just using this like a statemanagement
        let payload = JSON.parse(message.appData.msgPayload); // Extract the payload from the messageLog first
        this.checkIfIsInPayloadDataFormat(payload); // Convert stringified nested payload if there's any
        // Making a separate function to cater to different multi filters conditions are coded below
        if (filters) { // if filters is not null
            if (Object.keys(filters).length > 1) {
                let totalCount = Object.keys(filters).length;
                let matchedCount = 0;
                Object.entries(filters).forEach(([key, value]) => {
                    let filters = { [key]: value };
                    // console.log(filters)
                    if (this.checkValues(payload, filters) == true)
                        matchedCount++;
                });
                if (totalCount == matchedCount) { // check if all the criterias are met
                    response = true;
                }
                else {
                    response = false;
                }
            }
            else {
                if (this.checkValues(payload, filters) == true) {
                    response = true;
                }
                else {
                    response = false;
                }
            }
        }
        else { // if not filters is provided. Then the just let response be true so that the data can be further processed
            response = true;
        }
        return response;
    }
    /* This is where the 'synching' operation takes place. */
    synchronize() {
        let subjectOutput = new rxjs_1.Subject();
        // Acquire the data from both location and return them as an array respectively.
        this.acquireData().then((data) => {
            // In the case where there are differences in the array length, then extensive comparison
            // will be carried out to filters out the differences. Differences are the missing data.
            this.checkArrayDifferences(data).then((data) => {
                data.forEach(msgElement => {
                    let refined = JSON.parse(JSON.stringify(msgElement));
                    // Once the missing data has been weeded out, it is then passed into the Subject 
                    // to be returned for the subscribe method.`
                    subjectOutput.next(refined);
                });
            });
        }).catch((e) => console.error(e));
        return subjectOutput;
    }
    /* This is where the targeted data is queried. The process is pretty straightforward. */
    async acquireData() {
        const promiseQuery = new Promise((resolve, reject) => {
            // declare what to expect.
            let allSets = {
                arr1: [],
                arr2: []
            };
            let set1 = [];
            let set2 = [];
            // Initiate the source to find the location of the targeted data to be synched.
            this.sourceSrc.init(this.settings.incomingSource).then(() => {
                this.targetSrc.init(this.settings.target).then(() => {
                    // Filter also carries out the query aspect of the operation, allowing it to acquire all the relevant data.
                    this.sourceSrc.filter({ msgTag: this.settings.incomingSource.tags[0] }).then((data) => {
                        data.forEach((message) => {
                            if (this.filterData(this.settings.filters, message))
                                set1.push(message);
                        });
                    }).catch((err) => {
                        console.error(err.message);
                    }).then(() => {
                        this.targetSrc.filter({ msgTag: this.settings.target.tags[0] }).then((data) => {
                            data.forEach(message => {
                                if (this.filterData(this.settings.filters, message))
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
    // compare results and return differences
    async checkArrayDifferences(args) {
        return new Promise((resolve, reject) => {
            let missingMsg = [];
            args.arr1.forEach((msgElement) => {
                // In this case, we are just checking if the msgId matches within the given the array.
                // Just to save time, there's no need to check the entire message structure unless
                // the circumstances necessitates it.
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
    // To be used by the filterData function to check between payload values and filter conditions
    checkValues(payload, filters) {
        let key = Object.keys(filters);
        // console.log(Object.values(filters))
        let value = Object.values(filters)[0];
        let res = _.get(payload, key[0]);
        // Check first if the payload has the filtering properties/path
        if (_.has(payload, key[0])) {
            let strarray;
            // check array 
            if (Array.isArray(value)) {
                strarray = value;
            }
            else {
                strarray = [value];
            }
            // compare array with that string 
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
    // Check in the case of notification messages, for the nested data properties
    // Notification message may have multiple nested data properties that maybe in string format
    checkIfIsInPayloadDataFormat(payload) {
        let parsedData;
        if (payload && payload.data) {
            if (payload.data.data && payload.data.data.data && typeof payload.data.data.data === 'string') {
                parsedData = JSON.parse(payload.data.data.data);
                // console.log(parsedData)
                payload.data.data.data = parsedData;
                return payload;
            }
            else {
                return payload;
            }
        }
        else {
            return payload;
        }
    }
}
exports.MessageAuditorService = MessageAuditorService;
//# sourceMappingURL=message-auditor.service.js.map