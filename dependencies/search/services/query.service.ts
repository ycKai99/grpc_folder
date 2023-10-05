import { isObject, get } from 'lodash'
import { Observable, Subject, interval, map, of } from 'rxjs'
import { DataPrepService } from './dataprep.service'
import _ = require("lodash")
import { Conditions, DateRange, ObservableStorage, Storage, StorageLocation } from '../types/interface'
export class SearchService {

    private dataPrepService: DataPrepService
    constructor() {
        this.dataPrepService = new DataPrepService()
    }

    public callFromOtherClass() {
        const t0 = performance.now()
        let i
        for (i = 0; i <= 6000000000; i++) {
        }
        const t1 = performance.now()
        const timeTakenInSeconds = (t1 - t0) / 1000;
        console.log(`Time taken: ${timeTakenInSeconds} seconds to run this function`);
    }

    public query(storage: Storage, ...conditions: Conditions[]): Observable<any> {
        let dataFromStorage: Subject<any> = new Subject()
        let filteredResult: Subject<any> = new Subject()

        if (storage.type == 'observable') {
            // ObservableStorage
            let currentStorage:ObservableStorage = storage;
            let obsRef = currentStorage.ref
            obsRef.subscribe((element) => {
                dataFromStorage.next(element)
            })
        } else {
            // StorageLocation
            let currentStorage:StorageLocation = storage;
            this.dataPrepService.loadObsData(currentStorage, dataFromStorage)
        }

        this.filterFromObs(dataFromStorage, filteredResult, ...conditions)
        return filteredResult.pipe()
    }

    // Search and Filter: Pure Observables
    private filterFromObs(dataFromStorage: Subject<any>, filteredResult: Subject<any>, ...conditions: Conditions[]) {
        dataFromStorage.subscribe({
            next: element => {
                if (this.filterByKeyValue(element, ...conditions)) {
                    filteredResult.next(element)
                } else {
                    console.log(`${element.appData.msgId} does not match search criteria`)
                }
            }
        })
    }

    //  Logic 1: Success. But argument must specifies header.messageID.... to search
    private hasMatchingProps(data, condition): boolean {
        // Merge all condtions into searchObj
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
        return result
    }

    // Logic 2: Success: More superior version than Logic 1 since it can perform flat searches like {messageID : 1234}
    //  without specifying its parent property's name. eg: {header.messageID: 1234}
    private filterByKeyValue(data, ...conditions): boolean {
        try {
            // Merge all conditions into searchObj
            let searchObj = Object.assign({}, ...conditions)
            let recordFound = true

            // Check for data type. Can actually remove this code if dont want. Not that important anyways
            if (typeof data !== 'object' || typeof searchObj !== 'object') {
                return false;
            }

            // Check data to see if the given data is within the date range of the specified column
            if (recordFound == true) {
                if (searchObj.hasOwnProperty("$dateRange")) {
                    recordFound = this.filterByDateRange(data, searchObj.$dateRange)
                    delete searchObj.$dateRange
                }
            }

            // Check if the regular expression value matches any of the data string
            if (recordFound == true) {
                if (searchObj.hasOwnProperty("$regex")) {
                    recordFound = this.filterViaRegex(data, searchObj.$regex)
                    delete searchObj.$regex
                }
            }

            // Check if the key has parent key notation and then perform matching sequences. Eg : "header.appdata. etc etc" 
            if (recordFound == true) {
                // check if key is header.is like 'propertyName1.propertyName2'
                let searchkey = Object.keys(searchObj)
                searchkey.every((key) => {
                    if (key.includes('.')) {
                        let condition = {
                            key: searchObj[key]
                        }
                        this.hasMatchingProps(data, condition)
                        delete searchObj[key]
                    }
                })
            }

            // Check the rest of the key value pairs to see if the conditions are fulfilled(entries must matched)
            if (recordFound == true) {
                recordFound = this.matchValues(data, searchObj)
            }
            return recordFound
        }
        catch (e) {
            console.error(e.message)
        }
    }

    // Match the key values pair between conditions and the given data
    private matchValues(data, searchObj): boolean {
        let matchKeys = Object.keys(searchObj);
        let isMatchingObject = (object) => {
            return matchKeys.every((key) => {
                let lodashPath = key.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
                let objectValue = _.get(object, lodashPath);
                let searchValue = searchObj[key];

                if (Array.isArray(searchValue)) {
                    // Check if any of the search values are included in the object value
                    return searchValue.some((value) => {
                        return Array.isArray(objectValue) ? objectValue.includes(value) : objectValue === value;
                    });
                } else if (typeof searchValue === 'object' && typeof objectValue === 'object') {
                    return isMatchingObject(objectValue);
                } else {
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

    // Matching the regex args to see if it matches the data that is now converted to string. As long as partial match, it will return true
    private filterViaRegex(element: any, inquiry: any): boolean {
        // create a new regular expression to use regex.test
        const regex = new RegExp(inquiry);
        const hasMatchingSubstring = regex.test(JSON.stringify(element));
        return hasMatchingSubstring;
    }

    // Check if the data's date is within the date range provided and also the column in which the data is to be compared with
    private filterByDateRange(data: any, dateRange: DateRange): boolean {
        // Lodash implemetation to get the specific property of data
        let msgDate: string = get(data, dateRange.column)
        let date = new Date(msgDate)
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);
        return date >= start && date <= end;
    }

}

