"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const socket_io_client_1 = require("socket.io-client");
const socket_io_1 = require("socket.io");
const utility_service_1 = require("../services/utility.service");
const util = new utility_service_1.UtilityService();
util.checkMaxHeap();
let payload = new rxjs_1.Subject();
payload.subscribe((element) => {
});
let trafficControl = new rxjs_1.Subject();
let intervalChecking = (0, rxjs_1.interval)(1000);
intervalChecking.subscribe(() => {
    trafficControl.next(util.checkHeapSize());
});
function createWebsocketServer() {
    const io = new socket_io_1.Server({});
    io.on(`connection`, (socket) => {
        console.log(`Connected to clients`);
        const subscription = trafficControl.subscribe((heapUsagePercentage) => {
            let toBuffer = false;
            if (heapUsagePercentage >= 3) {
                toBuffer = true;
            }
            else {
                toBuffer = false;
            }
            socket.emit('trafficControl', {
                "consumerHeapUsage": heapUsagePercentage.toFixed(2),
                "buffer": toBuffer
            });
        });
        socket.on(`disconnect`, () => {
            console.log(`Clients Disconnected`);
            subscription.unsubscribe();
        });
    });
    io.listen(8081);
}
function connectWebSocket() {
    const socket = (0, socket_io_client_1.io)('http://localhost:8080');
    socket.on(`connect`, () => {
        console.log(`Connected to publisher'server`);
        socket.on('message', (message) => {
            trafficControl.next(message);
        });
    });
    socket.on('payload', (data) => {
        if (data.length > 0) {
            console.log(`Message received from publisher: ${data.length}`);
        }
        else {
            console.log(`Publisher is buffering. Data received = ${data.length}`);
        }
        data.forEach(element => {
            payload.next(element);
        });
    });
    socket.on('disconnect', () => {
        console.log(`Disconnected from publisher'server`);
        setTimeout(() => {
            console.log('Attempting to reconnect...');
            socket.connect();
        }, 1000);
    });
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
}
createWebsocketServer();
connectWebSocket();
//# sourceMappingURL=consumer_1.js.map