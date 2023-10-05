import { map, Observable, of, Subject } from "rxjs";
import { ErrorTrigger, MessageAuditorServiceInterface, MessageSynchronisationServiceSetting } from "../type/datatype";
import { LoggingService } from "../dependencies/log/interface/export";
import { MessageLog } from "../dependencies/log/type/datatype";
import { _ } from 'lodash'
import { BaseMessage, RequestMessage, ResponseMessage } from "../dependencies/msgutil/interface/export";

export class MessageAuditorService implements MessageAuditorServiceInterface {
    private settings: MessageSynchronisationServiceSetting
    private sourceSrc: LoggingService = new LoggingService()
    private targetSrc: LoggingService = new LoggingService()
    private missingMessageSubject: Subject<MessageLog> = new Subject()
    private filter: any

    /* Set up the targets or points of synchronization. This is where it will register the 2 different location of 
    the data to be synchronized */
    public init(settings: MessageSynchronisationServiceSetting, filters?: any): void {
        this.settings = settings;
        if (filters) {
            console.log(`Integrating filters: ${Object.keys(this.filter)} in AuditMessage service`)
            this.filter = filters
        }
    }

    /* This is the main interface of the message sync service. The argument will take in an observable stream of 
    error notifications, prompting it to perform the subscription of the targeted sources and it's corresponding 
    target. Essentially, this does not synchronize, but rather it checks against the two sources and compare
    and return the missing data, which will then be passed into the targeted subject stream as specified by the
    respective client. They can choose how they want to handle the missing messages returned. */
    public subscribe(obsTrigger: Observable<ErrorTrigger>): Observable<MessageLog> {
        // Subsribe to the errorTrigger obs to listen to any notification.
        obsTrigger.subscribe({
            next: obsTrigger => {
                console.log(obsTrigger.message)// just checking the message
                if (!this.filter) {
                    console.log(`No filter applies`)
                } else {
                    console.log(`Synchronizating with filters: ${Object.keys(this.filter)}: ${Object.values(this.filter)}`)
                }
                let missingMsg: Observable<MessageLog> = this.synchronize()
                missingMsg.subscribe({
                    next: element => {
                        this.missingMessageSubject.next(element)
                        console.log(`AuditService: Returning missing messages ${element.appData.msgId} ....`)
                    }
                })
            }
        })
        return this.missingMessageSubject
    }


    /* ________________ Private Functions _________________ */
    // Filtering functions to filter out messages
    private filterData(filters: any, message: MessageLog): boolean {
        let response: boolean = true //Just using this like a statemanagement
        let payload: BaseMessage = JSON.parse(message.appData.msgPayload as string) // Extract the payload from the messageLog first
        // Making a separate function to cater to different multi filter conditions are coded below
        function checkValues(filter): boolean { //FYI, all parameters are string
            let key = Object.keys(filter)
            console.log(Object.values(filter))
            let value = Object.values(filter)[0]
            let res = _.get(payload, key[0])
            // Check first if the payload has the filtering properties/path
            if (_.has(payload, key[0])) {
                // check if value is equal to fitler's
                let strarray: string[]
                // check array 
                if (Array.isArray(value)) {
                    strarray = value as string[]
                }
                else {
                    strarray = [value as string]
                }
                // compare array with that string 
                if (strarray.includes(res)) {
                    return true
                } else {
                    return false
                }
            } else {
                console.log(`${key} does not exists in payload`)
                return false
            }
        }
        if (filters) { // if filters is not null
            if (Object.keys(filters).length > 1) {
                let totalCount = Object.keys(filters).length
                let matchedCount = 0
                Object.entries(filters).forEach(([key, value]) => {
                    let filter = { [key]: value }
                    // console.log(filter)
                    if (checkValues(filter) == true) matchedCount++
                })
                if (totalCount == matchedCount) {
                    response = true
                } else {
                    response = false
                }
            } else {
                if (checkValues(filters) == true) {
                    response = true
                } else {
                    response = false
                }
            }
        } else {
            response = true
        }
        return response
    }

    /* This is where the 'synching' operation takes place. */
    private synchronize(): Subject<MessageLog> {
        let subjectOutput: Subject<MessageLog> = new Subject()
        // Acquire the data from both location and return them as an array respectively.
        this.acquireData().then((data: { arr1: MessageLog[], arr2: MessageLog[] }) => {
            // In the case where there are differences in the array length, then extensive comparison
            // will be carried out to filter out the differences. Differences are the missing data.
            this.checkArrayDifferences(data).then((data: MessageLog[]) => {
                data.forEach(msgElement => {
                    let refined = JSON.parse(JSON.stringify(msgElement))
                    // Once the missing data has been weeded out, it is then passed into the Subject 
                    // to be returned for the subscribe method.`
                    subjectOutput.next(refined)
                })
            })
        }).catch((e) => console.error(e))
        return subjectOutput
    }

    /* This is where the targeted data is queried. The process is pretty straightforward. */
    private async acquireData(): Promise<any> {
        const promiseQuery: Promise<any> = new Promise((resolve, reject) => {
            // declare what to expect.
            let allSets: {
                arr1: MessageLog[],
                arr2: MessageLog[]
            } = {
                arr1: [],
                arr2: []
            }
            let set1: MessageLog[] = []
            let set2: MessageLog[] = []

            // Initiate the source to find the location of the targeted data to be synched.
            this.sourceSrc.init(this.settings.incomingSource).then(() => {
                this.targetSrc.init(this.settings.target).then(() => {
                    // Filter also carries out the query aspect of the operation, allowing it to acquire all the relevant data.
                    this.sourceSrc.filter({ msgTag: this.settings.incomingSource.tags[0] }).then((data: MessageLog[]) => {
                        data.forEach((message: MessageLog) => {
                            if (this.filterData(this.filter, message)) set1.push(message)
                        })
                    }).catch((err) => {
                        console.error(err.message)
                    }).then(() => {
                        this.targetSrc.filter({ msgTag: this.settings.target.tags[0] }).then((data: MessageLog[]) => {
                            data.forEach(message => {
                                if (this.filterData(this.filter, message)) set2.push(message)
                            })
                            allSets.arr1 = set1
                            allSets.arr2 = set2
                            resolve(allSets)
                        })
                    })
                })
            })
        })
        return promiseQuery
    }

    // compare results and return differences
    private async checkArrayDifferences(args: { arr1: MessageLog[], arr2: MessageLog[] }): Promise<MessageLog[]> {
        return new Promise((resolve, reject) => {
            let missingMsg: MessageLog[] = []
            args.arr1.forEach((msgElement: MessageLog) => {
                // In this case, we are just checking if the msgId matches within the given the array.
                // Just to save time, there's no need to check the entire message structure unless
                // the circumstances necessitates it.
                if (args.arr2.some(obj => obj.appData.msgId === msgElement.appData.msgId)) {
                    console.log(`Item Found!`)
                } else {
                    console.log(`This ${msgElement.appData.msgId} is missing`)
                    missingMsg.push(msgElement)
                    resolve(missingMsg)
                }
            })
        })
    }


}