"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const dataprep_service_1 = require("./dataprep.service");
const _ = require("lodash");
class SearchService {
    constructor() {
        this.dataPrepService = new dataprep_service_1.DataPrepService();
    }
    callFromOtherClass() {
        const t0 = performance.now();
        let i;
        for (i = 0; i <= 6000000000; i++) {
        }
        const t1 = performance.now();
        const timeTakenInSeconds = (t1 - t0) / 1000;
        console.log(`Time taken: ${timeTakenInSeconds} seconds to run this function`);
    }
    query(storage, ...conditions) {
        let dataFromStorage = new rxjs_1.Subject();
        let filteredResult = new rxjs_1.Subject();
        if (storage.type == 'observable') {
            let currentStorage = storage;
            let obsRef = currentStorage.ref;
            obsRef.subscribe((element) => {
                dataFromStorage.next(element);
            });
        }
        else {
            let currentStorage = storage;
            this.dataPrepService.loadObsData(currentStorage, dataFromStorage);
        }
        this.filterFromObs(dataFromStorage, filteredResult, ...conditions);
        return filteredResult.pipe();
    }
    filterFromObs(dataFromStorage, filteredResult, ...conditions) {
        dataFromStorage.subscribe({
            next: element => {
                if (this.filterByKeyValue(element, ...conditions)) {
                    filteredResult.next(element);
                }
                else {
                    console.log(`${element.appData.msgId} does not match search criteria`);
                }
            }
        });
    }
    hasMatchingProps(data, condition) {
        let result = _.every(condition, (val, key) => {
            const propKeys = key.split('.');
            let nestedObj = data;
            _.forEach(propKeys, propKey => {
                nestedObj = nestedObj[propKey];
            });
            if (_.isObject(val)) {
                return this.hasMatchingProps(nestedObj, val);
            }
            return nestedObj === val;
        });
        return result;
    }
    filterByKeyValue(data, ...conditions) {
        try {
            let searchObj = Object.assign({}, ...conditions);
            let recordFound = true;
            if (typeof data !== 'object' || typeof searchObj !== 'object') {
                return false;
            }
            if (recordFound == true) {
                if (searchObj.hasOwnProperty("$dateRange")) {
                    recordFound = this.filterByDateRange(data, searchObj.$dateRange);
                    delete searchObj.$dateRange;
                }
            }
            if (recordFound == true) {
                if (searchObj.hasOwnProperty("$regex")) {
                    recordFound = this.filterViaRegex(data, searchObj.$regex);
                    delete searchObj.$regex;
                }
            }
            if (recordFound == true) {
                let searchkey = Object.keys(searchObj);
                searchkey.every((key) => {
                    if (key.includes('.')) {
                        let condition = {
                            key: searchObj[key]
                        };
                        this.hasMatchingProps(data, condition);
                        delete searchObj[key];
                    }
                });
            }
            if (recordFound == true) {
                recordFound = this.matchValues(data, searchObj);
            }
            return recordFound;
        }
        catch (e) {
            console.error(e.message);
        }
    }
    matchValues(data, searchObj) {
        let matchKeys = Object.keys(searchObj);
        let isMatchingObject = (object) => {
            return matchKeys.every((key) => {
                let lodashPath = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
                let objectValue = _.get(object, lodashPath);
                let searchValue = searchObj[key];
                if (Array.isArray(searchValue)) {
                    return searchValue.some((value) => {
                        return Array.isArray(objectValue) ? objectValue.includes(value) : objectValue === value;
                    });
                }
                else if (typeof searchValue === 'object' && typeof objectValue === 'object') {
                    return isMatchingObject(objectValue);
                }
                else {
                    return objectValue === searchValue;
                }
            });
        };
        let isObjectMatching = (object) => {
            if (typeof object !== 'object') {
                return false;
            }
            return isMatchingObject(object) || Object.values(object).some(isObjectMatching);
        };
        return isObjectMatching(data);
    }
    filterViaRegex(element, inquiry) {
        const regex = new RegExp(inquiry);
        const hasMatchingSubstring = regex.test(JSON.stringify(element));
        return hasMatchingSubstring;
    }
    filterByDateRange(data, dateRange) {
        let msgDate = (0, lodash_1.get)(data, dateRange.column);
        let date = new Date(msgDate);
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return date >= start && date <= end;
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=query.service.js.map