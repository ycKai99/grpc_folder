import { SearchService } from "../services/query.service"
import _ = require("lodash")
import { Subject, interval } from "rxjs";
import { io } from "socket.io-client";
import { Server } from "socket.io"
import { UtilityService } from "../services/utility.service";

const util = new UtilityService()
util.checkMaxHeap()
/* ---------------------- COMPLEX OPERATION ------------------------------ */

// Create new Subject to handle incoming data from remote subscription
let payload: Subject<any> = new Subject()
payload.subscribe((element) => {
    // console.log(`Received message from server: ${element.appData.msgId}`);
})

// Create new Subject to monitor and broadcast heap size 
let trafficControl: Subject<any> = new Subject()
let intervalChecking = interval(1000)
intervalChecking.subscribe(() => {
    trafficControl.next(util.checkHeapSize())
})

// Create a WebSocket server
function createWebsocketServer() {
    const io = new Server({})
    // Listen for connections to the WebSocket server
    io.on(`connection`, (socket) => {
        console.log(`Connected to clients`);

        // Subscribe to the subject when a client connects
        const subscription = trafficControl.subscribe((heapUsagePercentage: number) => {

            // Boolean to be emitted to server to tell them to buffer the incoming 
            let toBuffer = false;

            // Set to 3% at the moment
            if (heapUsagePercentage >= 3) {
                toBuffer = true
            } else {
                toBuffer = false
            }

            // Stream traffic control obs data over to designated client/consumer.
            socket.emit('trafficControl', {
                "consumerHeapUsage": heapUsagePercentage.toFixed(2),
                "buffer": toBuffer
            });
        });

        socket.on(`disconnect`, () => {
            console.log(`Clients Disconnected`)
            subscription.unsubscribe()
        })

    })

    // create localhost server port 8080
    io.listen(8081);
}


// Create a new WebSocket client
function connectWebSocket() {
    const socket = io('http://localhost:8080')

    // Listen for the WebSocket connection to open
    socket.on(`connect`, () => {
        console.log(`Connected to publisher'server`)


        // Listen for messages from the server
        socket.on('message', (message) => {
            trafficControl.next(message);
        });
    })

    // Receive payload from publisher and push them into local Subject
    socket.on('payload', (data: any[]) => {
        if(data.length > 0){
            // just to check if there's any data
            console.log(`Message received from publisher: ${data.length}`)
        } else {
            console.log(`Publisher is buffering. Data received = ${data.length}`)
        }
        data.forEach(element => {
            payload.next(element)
            // console.log(element.appData.msgId)
            // trafficControl.next(util.checkHeapSize())
        });
    })

    // Listen for the disconnect event
    socket.on('disconnect', () => {
        console.log(`Disconnected from publisher'server`);

        // Attempt to reconnect every 1 second
        setTimeout(() => {
            console.log('Attempting to reconnect...');
            socket.connect();
        }, 1000);
    });

    // Listen for errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

}

createWebsocketServer()
connectWebSocket();
