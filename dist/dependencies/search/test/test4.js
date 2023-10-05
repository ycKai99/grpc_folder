"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const query_service_1 = require("../services/query.service");
const dataprep_service_1 = require("../services/dataprep.service");
let query = new query_service_1.SearchService();
let dataPrepService = new dataprep_service_1.DataPrepService();
let mongoStorage = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
};
let conditions1 = [
    { 'msgTag': ['Incoming'] }
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
let obsStorage = new rxjs_1.Subject();
dataPrepService.loadObsData(mongoStorage, obsStorage);
const testObs = {
    type: "observable",
    ref: obsStorage
};
query.query(testObs, ...conditions1).subscribe((element) => {
    console.log(element.appData.msgId);
});
//# sourceMappingURL=test4.js.map