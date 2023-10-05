import { BehaviorSubject, Observable, Subject, buffer, bufferWhen, elementAt, filter, interval, map } from 'rxjs';
import { DataPrepService } from '../services/dataprep.service';
import { StorageLocation } from '../types/interface';
import { Server } from 'socket.io'
import { io } from 'socket.io-client';
import { UtilityService } from '../services/utility.service';


let msgData = new DataPrepService()
let util = new UtilityService()
util.checkMaxHeap()

/* ---------------------- COMPLEX OPERATION ------------------------------ */
let msgPayload: Subject<any> = new Subject();
let consumerTrafficStatus: Subject<any> = new Subject()
let inputliveSubject = new Subject();
let OutputliveSubject = new Subject();

let mongoStorage: StorageLocation = {
    type: `MongoDB`,
    url: `mongodb://192.168.100.59:27017/default`
}
msgData.loadObsData(mongoStorage, msgPayload)

// Create a WebSocket server
function createWebsocketServer() {
    const io = new Server({})
    io.on('connection', (socket) => {
        console.log(`Connected to Clients/Consumers`)
        // let notifier = consumerTrafficStatus.pipe(filter(value => !value.pause))

        // Subscribe to the subject when a client connects
        const subscription = msgPayload.pipe(
            backlogBuffer(msgPayload, consumerTrafficStatus)
        ).subscribe((element) => {
            if (element.length >= 25000) {
                const chunkSize = 1024; // Specify the desired chunk size in bytes
                const totalChunks = Math.ceil(element.length / chunkSize);

                Array.from({ length: totalChunks }, (_, i) => {
                    const start = i * chunkSize;
                    const end = start + chunkSize;
                    const chunk = element.slice(start, end);

                    console.log(`Emitting ${element.length} messages`)
                    socket.emit('payload', chunk);
                });
                socket.emit(`end`)
            } else {
                // console.log(`Emitting ${element.length} messages`)
                socket.emit(`payload`, element);
            }

        });

        // Listen for the socket to be closed
        socket.on('disconnect', () => {
            console.log('Client/Consumer disconnected');
            subscription.unsubscribe();
        });
    })

    io.listen(8080)
}

// Create a new WebSocket client
function connectWebSocket() {
    const socket = io('http://localhost:8081');

    socket.on('connect', () => {
        console.log(`Connected to Consumer'Server.`);
    });

    // Subsribe to trafficControl from consumer's side
    socket.on('trafficControl', (report: any) => {
        console.log(report)
        consumerTrafficStatus.next(report);
    });

    socket.on('disconnect', () => {
        console.log(`Disconnected from Consumer'Server`);

        // Attempt to reconnect every 3 seconds
        setTimeout(() => {
            console.log('Attempting to reconnect...');
            socket.connect();
        }, 3000);
    });
}


function backlogBuffer(msgPayload: Subject<any>, notifier: Observable<any>) {
    // Pulse by each message to tell output to keep releasing the buffer unless requested by client/consumer not to do so.
    msgPayload.subscribe(inputliveSubject)

    // Notfier act as a input from client/consumer's side to listen to request for buffering or releasing for the buffer
    notifier.subscribe(inputliveSubject)

    let toBuffer = false // true or false
    inputliveSubject.subscribe((element: any) => {
        if ('buffer' in element && element.buffer == true) {
            // Start the buffer
            toBuffer = element.buffer
            console.log(`Buffering....`)
        }
        if (element && toBuffer == false) {
            // Continue to release the buffer
            OutputliveSubject.next(element)
        }
    })
    return buffer(OutputliveSubject);
}

createWebsocketServer()
connectWebSocket();
