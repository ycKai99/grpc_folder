"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rxjs_1 = require("rxjs");
const query_service_1 = require("../services/query.service");
const used = process.memoryUsage();
let MongooseConnection;
let connectionStatus = 0;
let mongoStorage = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
};
let testSubject = new rxjs_1.Subject();
let count = 0;
async function connectMongo(storage) {
    return new Promise((resolve, reject) => {
        try {
            console.log(`Connecting to ${storage.url}`);
            MongooseConnection = mongoose_1.default.createConnection(storage.url);
            connectionStatus = 1;
            resolve(connectionStatus);
        }
        catch (error) {
            connectionStatus = 0;
            console.error('An error occurred while connecting to the database:', error);
            setTimeout(() => {
                connectMongo(storage).then(() => {
                    resolve(connectionStatus);
                });
                console.log(`Reconnecting...`);
            }, 3000);
        }
    });
}
function streamMongoData(storage, subjectStream) {
    connectMongo(storage).then(() => {
        let message = MongooseConnection.model('Message', require('../types/message.schema'));
        let stream = message.find().limit(10).cursor();
        stream.on('data', (data) => subjectStream.next(data));
        stream.on('error', (error) => subjectStream.error(error));
        stream.on('end', () => subjectStream.complete());
    });
}
async function handler1(element) {
    return new Promise((resolve, reject) => {
        const min = 1;
        const max = 5;
        const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(() => {
            console.log(`Handler 1: Processing data ${element} for ${randomInt} seconds.`);
            resolve(element);
        }, randomInt * 1000);
    });
}
function handler2(element) {
    const min = 1;
    const max = 5;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
        console.log(`Handler 2: Processing data ${element} for ${randomInt} seconds.`);
        handlers(element);
    }, randomInt * 1000);
}
function handlers(element) {
    const min = 1;
    const max = 5;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(() => {
        console.log(`Callback Handlers: Processing data ${element} for ${randomInt} seconds.`);
    }, randomInt * 1000);
}
function printLog() {
    let service = new query_service_1.SearchService();
    service.callFromOtherClass();
}
let publishDataEverySecond = (0, rxjs_1.interval)(1000);
let control = (0, rxjs_1.interval)(5000);
function understandingOBS() {
    publishDataEverySecond.subscribe({
        next: element => {
            console.log(`Data received: ${element}`);
            handler1(element).then((data) => {
                handler2(data);
            });
            printLog();
            console.trace();
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`Heap memory used: ${Math.round(used * 100) / 100} MB`);
        }
    });
}
function bufferOBS() {
    let bufferring = publishDataEverySecond.pipe((0, rxjs_1.buffer)(control));
    bufferring.subscribe((element) => {
        console.log(`Data received: ${element}`);
        handler1(element).then((data) => {
            handler2(data);
        });
    });
}
function bufferWhenOBS() {
    let buffered = publishDataEverySecond.pipe((0, rxjs_1.bufferWhen)(() => (0, rxjs_1.interval)(1000 + Math.random() * 4000)));
    buffered.subscribe({
        next(element) {
            console.log(`Data received: ${element}`);
            handler1(element).then((data) => {
                handler2(data);
            });
        }
    });
}
function asyncScheduleOBS() {
    const scheduleObservable = (0, rxjs_1.interval)(1000);
    const delayTime = 3000;
    let subscription = rxjs_1.asyncScheduler.schedule(() => {
        scheduleObservable.subscribe((element) => {
            console.log(element);
        });
    }, delayTime);
}
asyncScheduleOBS();
function queue_Scheduler() {
    let task1 = () => console.log('Task 1');
    let task2 = () => console.log('Task 2');
    let task3 = () => console.log('Task 3');
    (0, rxjs_1.of)(null)
        .pipe((0, rxjs_1.observeOn)(rxjs_1.queueScheduler))
        .subscribe(() => {
        task1();
        task2();
        task3();
    });
}
//# sourceMappingURL=test3.js.map