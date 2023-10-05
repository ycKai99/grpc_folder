"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const dataprep_service_1 = require("../services/dataprep.service");
const socket_io_1 = require("socket.io");
const socket_io_client_1 = require("socket.io-client");
const utility_service_1 = require("../services/utility.service");
let msgData = new dataprep_service_1.DataPrepService();
let util = new utility_service_1.UtilityService();
util.checkMaxHeap();
let msgPayload = new rxjs_1.Subject();
let consumerTrafficStatus = new rxjs_1.Subject();
let inputliveSubject = new rxjs_1.Subject();
let OutputliveSubject = new rxjs_1.Subject();
let mongoStorage = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
};
msgData.loadObsData(mongoStorage, msgPayload);
function createWebsocketServer() {
    const io = new socket_io_1.Server({});
    io.on('connection', (socket) => {
        console.log(`Connected to Clients/Consumers`);
        const subscription = msgPayload.pipe(backlogBuffer(msgPayload, consumerTrafficStatus)).subscribe((element) => {
            if (element.length >= 25000) {
                const chunkSize = 1024;
                const totalChunks = Math.ceil(element.length / chunkSize);
                Array.from({ length: totalChunks }, (_, i) => {
                    const start = i * chunkSize;
                    const end = start + chunkSize;
                    const chunk = element.slice(start, end);
                    console.log(`Emitting ${element.length} messages`);
                    socket.emit('payload', chunk);
                });
                socket.emit(`end`);
            }
            else {
                socket.emit(`payload`, element);
            }
        });
        socket.on('disconnect', () => {
            console.log('Client/Consumer disconnected');
            subscription.unsubscribe();
        });
    });
    io.listen(8080);
}
function connectWebSocket() {
    const socket = (0, socket_io_client_1.io)('http://localhost:8081');
    socket.on('connect', () => {
        console.log(`Connected to Consumer'Server.`);
    });
    socket.on('trafficControl', (report) => {
        console.log(report);
        consumerTrafficStatus.next(report);
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected from Consumer'Server`);
        setTimeout(() => {
            console.log('Attempting to reconnect...');
            socket.connect();
        }, 3000);
    });
}
function backlogBuffer(msgPayload, notifier) {
    msgPayload.subscribe(inputliveSubject);
    notifier.subscribe(inputliveSubject);
    let toBuffer = false;
    inputliveSubject.subscribe((element) => {
        if ('buffer' in element && element.buffer == true) {
            toBuffer = element.buffer;
            console.log(`Buffering....`);
        }
        if (element && toBuffer == false) {
            OutputliveSubject.next(element);
        }
    });
    return (0, rxjs_1.buffer)(OutputliveSubject);
}
createWebsocketServer();
connectWebSocket();
//# sourceMappingURL=publisher.js.map