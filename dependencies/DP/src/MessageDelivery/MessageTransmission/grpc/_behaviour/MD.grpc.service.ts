import { Observable, Subject, map } from "rxjs";
import { Request, Response } from './utility/messages_pb';
import { MessageDeliveryInterface } from "../../../../_interfaces/MD.interface";
import { ConnectionInterface } from "../../../../_interfaces/MD.connection.interface";
import { NotificationMessage, ResponseMessage, RequestMessage, SubscriptionMessage, FisCreateMessageUtility } from "../../../../_interfaces/export";
import { MessageServiceClient, Status } from "./utility/messages_pb_service";
import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import * as grpc_ext from 'grpc';
export class GRPCDomainProxyServiceClass implements MessageDeliveryInterface {

    /* All required GRPC packages to be loaded to make the transport working */
    PROTO_PATH = __dirname + '/utility/messages.proto'; // Point to the right file
    packageDefinition = protoLoader.loadSync(
        this.PROTO_PATH,
        { // this is just following the the sample provided by the official documentation
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true
        });
    message_proto: any = grpc.loadPackageDefinition(this.packageDefinition).message // Cannot specify ProtobufMessage type at the moment. The 'any' type is just a temporary solution

    client = new this.message_proto.MessageService(`192.168.100.59:50151`, // Specifying the address and the port for the transport. Windev with 50151(desigated for GRPC)
        grpc.credentials.createInsecure())

    public MessageService: FisCreateMessageUtility;
    public isConnectionStatusObserved = false;
    private settings: ConnectionInterface;
    logger: any[] = [];
    userdat = { user: 'abc', pass: '123' };
    messageClient: MessageServiceClient;
    jwtToken: string;
    public getMessageService() {
        return this.MessageService;
    }

    initialise(settings: ConnectionInterface) {
        this.settings = settings;
    }

    emit(msg: NotificationMessage) {
        let req = new Request();
        req.setMessage(JSON.stringify(msg));

        return this.transmit(req)
    }

    subscribe(msg: SubscriptionMessage): Observable<ResponseMessage> {
        // Sent and get observable
        return this.send(<RequestMessage>msg);
    }

    /* Send the request mesasge to designated UCP server */
    send(
        msg: RequestMessage | NotificationMessage,
        isStream: boolean = true,
    ): Observable<ResponseMessage> {
        let req = {
            "id": "1",
            "message": JSON.stringify(msg)
        }
        // console.log(`Just checking if the message is still there: ${req.id}`)
        let result: Observable<ResponseMessage> = this.transmit(req)
        // result.subscribe((e) => { console.log(e) }) // Just testing
        return result
    }

    /* This is where the function defined in the proto file is handled. Can also be said to handle the actual GRPC transport 
    Every payload goes through this function. It is a combination of the GRPC solution provided from the official git sample 
    on nodejs and then combined with the function to deal with the stream, previously known as "callProtobufStream" */
    transmit(msg): Observable<ResponseMessage> {
        let observer = new Subject(); // This subject or observable is created to handle incoming messages. 
        /* This stream is where the grpc will handle whatever payload that comes through the designated port as specified above
        Programmer must use the function defined in the protogile, which in this case it's the "HandleMessage" to deal with
        incoming payload. */
        let stream: grpc_ext.ServerWriteableStream<GrpcRequest, GrpcResponse> = this.client.HandleMessage(msg, function (err, response) {
            if (err) {
                console.error('Error:', err);
                return;
            }
            console.log('Response:', response);
        })

        // Check response and set the condition for error accordingly. This is subject to be enhanced in the future for more robust functionality
        stream.on('status', (response: any) => {
            if (response.code !== 0) {
                observer.error(response);
                observer.complete();
            }
        });
        // Inject all the incoming payload in the created observable/subject above. aka observer
        stream.on('data', (response: any) => {
            let msgObj = response;//JSON.parse(response);
            if (msgObj.status === 'failure' || msgObj.status === 'error') {
                observer.error(msgObj);
                observer.complete();
            } else observer.next(response);
        });
        stream.on('end', () => {
            observer.complete();
        });

        // This chunk of code is not necessary, but good for testing if there's any response. Can use this in the future if needed.
        // observer.subscribe({
        //     next(element: any) {
        //         console.log(element); 
        //     },
        //     error(err) {
        //         console.error('something wrong occurred: ' + err);
        //     },
        //     complete() {
        //         console.log('done');
        //     },
        // });

        // will have to convert the message payload, since it is in string format.
        let responseMsg: Observable<ResponseMessage> = observer.pipe(map(
            message => this.convertFisAppResponse(message)
        ))

        return responseMsg
    }

    // Convert string message back into it's original format.
    convertFisAppResponse(resp: any): ResponseMessage {
        try {
            let message: ResponseMessage;
            message = JSON.parse(resp['message']);
            return message;
        } catch (e) {
            console.log('Error performing conversion.' + e);
            console.log(resp);
        }
    }

}
export class MessageType {
    static readonly GET_METADATA = 'getMetadata';
    static readonly GET_BIZDATA = 'getBizData';
}

// Required types to get the package definition working.
type GrpcRequest = {
    id: string,
    message: string,
}
type GrpcResponse = GrpcRequest