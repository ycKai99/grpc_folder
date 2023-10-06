import { Observable } from "rxjs";
import { AppLocation, AppLogLoc, LoggingServiceInterface, LogLocation, LogSetting, MessageLog, AppProfile, MsgDateTime } from "../type/datatype";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
/**
 * Generic logging service
 * - Allow logging of observable
 */
export declare class LoggingService implements LoggingServiceInterface {
    private MongooseConnection;
    private connectionStatus;
    private settings;
    private needReconnect;
    private arrLog;
    private storage;
    private appProfile;
    private appLocation;
    private logLocation;
    private appLogLoc;
    init(settings: LogSetting): Promise<MessageLog[]>;
    subscribe(MessageLog_Incoming?: Observable<MessageLog | BaseMessage>, AppLocation?: AppLocation, LogLocation?: LogLocation, AppLogLoc?: AppLogLoc, AppProfile?: AppProfile, localState?: LocalStates, element?: MessageLog): Promise<string | number>;
    filter(search: {
        msgId: string | number;
    } | {
        msgTag: string;
    } | {
        msgPayload: string;
    } | any | MsgDateTime): Promise<MessageLog[]>;
    convertCDMStoMessageLog(args: any, tag?: string | string[]): Promise<MessageLog>;
    convertMessageLogtoCDMS(args: MessageLog): Promise<any>;
    private writeLogLoc;
    private writeMessage;
    private writeSettings;
    private updateSettings;
    private setSettings;
    private generateId;
    private initialReadData;
    private connectMongo;
    private setUpSuccess;
    private passwordConversion;
    private connectStorage;
    private findFromMongo;
}
export declare enum LocalStates {
    UpdatedSettings = "UpdatedSettings",
    Subscription = "Subscription",
    WriteLogLoc = "WriteLogLoc",
    WriteMessage = "WriteMessage"
}
