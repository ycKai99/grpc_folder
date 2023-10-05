/* the key is to do it in one line. Client just pass 2 arguments, one is the location of the data, which could be file, sql or mongodb, and also
pass in the conditions of their search enquiries. We will aslo have to cater to different file storage location to determine how to prep the
data to be filtered
 */
import { Observable } from "rxjs"
import { SearchService } from "../services/query.service"
import {  isObject } from 'lodash'
import _ = require("lodash")
import { Conditions, StorageLocation } from "../types/interface"

let query = new SearchService()

//For now just local file storage. More will be preapred in the design phase later.
let storageAddress: StorageLocation = {
    type: "File",
    url: "payload.json"
}

// Array inquiry: should return mutiple data
let conditions1: Conditions[] = [
    { 'msgTag': ['basic'] }
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
query.query(storageAddress, ...conditions1).subscribe((element) => {
    console.log(`OBS1 : ${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions2).subscribe((element) => {
    console.log(`OBS2 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions3).subscribe((element) => {
    console.log(`OBS3 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions4).subscribe((element) => {
    console.log(`OBS4 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions5).subscribe((element) => {
    console.log(`OBS5 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions6).subscribe((element) => {
    console.log(`OBS6 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions7).subscribe((element) => {
    console.log(`OBS7 :${element.header.messageName} is matched`)
})
query.query(storageAddress, ...conditions8).subscribe((element) => {
    console.log(`OBS8 :${element.header.messageName} is matched`)
})
