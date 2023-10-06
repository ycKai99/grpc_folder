import { Observable } from "rxjs";
import { Request, Response } from './grpc/messages_pb';
import { MessageDeliveryInterface } from "../interface/MD.interface";
import { ConnectionInterface } from "../interface/MD.connection.interface";
import { NotificationMessage, ResponseMessage, RequestMessage, FisCreateMessageUtility } from "../interface/export";
import { MessageServiceClient } from "./grpc/messages_pb_service";
export declare class GRPCDomainProxyServiceClass implements MessageDeliveryInterface {
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
    private http;
    constructor();
    initialise(settings: ConnectionInterface): void;
    emit(msg: NotificationMessage): Observable<ResponseMessage>;
    send(msg: RequestMessage | NotificationMessage, isStream?: boolean): Observable<ResponseMessage>;
    convertFisAppResponse(resp: any): ResponseMessage;
    /**
     * initiate Protobuf stream from server
     * @param Request
     */
    callProtobufStream(request: Request, protoServerUrl?: string): Observable<Response>;
    httpGet<T>(url: string, params?: any): Observable<any>;
    httpPost<T>(url: string, params?: any): Observable<any>;
    getFromDomain<T>(url: string, params?: any): Observable<any>;
    postToDomain(url: string, payload: any): Observable<any>;
    uploadFiles(url: string, formData: FormData): Observable<any>;
    /** *GET JWT Authentication Token from server and stores it in localStorage */
    private getAuthKey;
}
export declare class MessageType {
    static readonly GET_METADATA = "getMetadata";
    static readonly GET_BIZDATA = "getBizData";
}
