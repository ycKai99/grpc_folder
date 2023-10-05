"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_service_1 = require("../services/query.service");
let query = new query_service_1.SearchService();
let storageAddress = {
    type: "File",
    url: "payload.json"
};
let conditions1 = [
    { 'msgTag': ['basic'] }
];
let conditions2 = [
    { "msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "msgLogDateTime": "2023-01-14T21:50:19.917Z" },
];
let conditions3 = [
    { "$regex": "cum incidunt maxime voluptatibus" }
];
let conditions4 = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
];
let conditions5 = [
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
];
let conditions6 = [
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
];
let conditions7 = [
    {
        "$dateRange": {
            "startDate": "2022-04-29T00:00:00.000Z",
            'endDate': "2022-04-30T00:00:00.000Z",
            'column': "data.data.appData.msgDateTime"
        }
    },
    { "$regex": "maxime voluptatibus ad quasi eveniet" },
    { "data.data.appData.msgId": "4f710c4b-a258-4c7e-a4b6-6095bb7028e9" },
    { "msgLogDateTime": "2023-01-14T21:50:19.917Z" }
];
let conditions8 = [
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
];
query.query(storageAddress, ...conditions1).subscribe((element) => {
    console.log(`OBS1 : ${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions2).subscribe((element) => {
    console.log(`OBS2 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions3).subscribe((element) => {
    console.log(`OBS3 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions4).subscribe((element) => {
    console.log(`OBS4 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions5).subscribe((element) => {
    console.log(`OBS5 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions6).subscribe((element) => {
    console.log(`OBS6 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions7).subscribe((element) => {
    console.log(`OBS7 :${element.header.messageName} is matched`);
});
query.query(storageAddress, ...conditions8).subscribe((element) => {
    console.log(`OBS8 :${element.header.messageName} is matched`);
});
//# sourceMappingURL=test1.js.map