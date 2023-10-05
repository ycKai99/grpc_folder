/* 
 */
import { Observable, Subject, of } from "rxjs"
import { SearchService } from "../services/query.service"
import _ = require("lodash")
import { DataPrepService } from "../services/dataprep.service"
import { Conditions, ObservableStorage, StorageLocation } from "../types/interface"

let query = new SearchService()
let dataPrepService = new DataPrepService()


let mongoStorage: StorageLocation = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
}

// Array inquiry: should return mutiple data
let conditions1: Conditions[] = [
    { 'msgTag': ['Incoming'] }
]

// Basic inquiry, but with multi search: should return one data
let conditions2: Conditions[] = [
    { "msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "msgLogDateTime": "2023-01-14T21:50:19.917Z" },
]

// Value only argument! : should return one data
let conditions3: Conditions[] = [
    { "$regex": "cum incidunt maxime voluptatibus" }
]

// Date Range inquiry: Should return 1 data
let conditions4: Conditions[] = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
]

// Multi conditions except for regex search: Should return at least 1 data
let conditions5: Conditions[] = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
    { 'msgTag': ['basic'] },
    { "msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "msgLogDateTime": "2023-01-14T21:50:19.917Z" }
]

// Ultimate search. With all conditions piling at once: Should at least returns 1 data
let conditions6: Conditions[] = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
    { "$regex": "maxime voluptatibus ad quasi eveniet" },
    { 'msgTag': ['basic'] },
    { "msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
]

// should return 1 data
let conditions7: Conditions[] = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
    { "$regex": "maxime voluptatibus ad quasi eveniet" },
    // { 'data.data.appData.msgTag': ['basic'] },
    { "data.data.appData.msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "msgLogDateTime": "2023-01-14T21:50:19.917Z" }
]
// should not return anything
let conditions8: Conditions[] = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
    { "$regex": "maxime voluptatibus ad quasi eveniet" },
    { 'msgTag': ['basic'] },
    { "data.data.appDatamsgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "header.msgLogDateTime": "2023-01-14T21:50:19.917Z" }
]


let obsStorage : Subject<any> = new Subject()

// The dataPrepService is only used to feed data to the subject observable and not required before .query 
dataPrepService.loadObsData(mongoStorage, obsStorage)

const testObs: ObservableStorage = {
    type: "observable",
    ref: obsStorage
}

query.query(testObs, ...conditions1).subscribe((element) => {
    console.log(element.appData.msgId)
})