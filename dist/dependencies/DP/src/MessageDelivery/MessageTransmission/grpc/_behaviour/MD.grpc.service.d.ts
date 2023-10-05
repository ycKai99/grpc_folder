import { Observable } from "rxjs";
import { MessageDeliveryInterface } from "../../../../_interfaces/MD.interface";
import { ConnectionInterface } from "../../../../_interfaces/MD.connection.interface";
import { NotificationMessage, ResponseMessage, RequestMessage, SubscriptionMessage, FisCreateMessageUtility } from "../../../../_interfaces/export";
import { MessageServiceClient } from "./utility/messages_pb_service";
import * as protoLoader from "@grpc/proto-loader";
export declare class GRPCDomainProxyServiceClass implements MessageDeliveryInterface {
    PROTO_PATH: string;
    packageDefinition: protoLoader.PackageDefinition;
    message_proto: any;
    client: any;
    MessageService: FisCreateMessageUtility;
    isConnectionStatusObserved: boolean;
    private settings;
    logger: any[];
    userdat: {
        user: string;
        pass: string;
    };
    messageClient: MessageServiceClient;
    jwtToken: string;
    getMessageService(): FisCreateMessageUtility;
    initialise(settings: ConnectionInterface): void;
    emit(msg: NotificationMessage): Observable<ResponseMessage>;
    subscribe(msg: SubscriptionMessage): Observable<ResponseMessage>;
    send(msg: RequestMessage | NotificationMessage, isStream?: boolean): Observable<ResponseMessage>;
    transmit(msg: any): Observable<ResponseMessage>;
    convertFisAppResponse(resp: any): ResponseMessage;
}
export declare class MessageType {
    static readonly GET_METADATA = "getMetadata";
    static readonly GET_BIZDATA = "getBizData";
}
