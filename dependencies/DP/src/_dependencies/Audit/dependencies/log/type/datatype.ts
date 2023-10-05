import { Observable } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";

// Application Profile

export interface AppProfile {
  appId: string, // Should be constant for same application. 
  appName: string // Should be constant for same application.
}

// Logging host
export interface AppLocation {
  appId: string, // Link to/Same as AppProfile.appId
  appLocId: string, // Instance UUID of the application. (Need to generate once when application start for each application)
  appLocName: string // Instance name of the application. (Need to generate once when application start for each application)
}

// Observable logging point 
export interface LogLocation {
  logLocId: string,  // Instance UUID of the application's point of logging. (Need to generate once when application start for each logging point)
  logLocName: string  // Instance name of the application's point of logging. (Need to generate once when application start for each logging point)
}

// Multiple logging points per host 
export interface AppLogLoc {
  appLogLocId: string, // Link to/Same as MessageLog.appLogLocId
  appLocId: string, // Link to/Same as AppLocation.appLocId 
  logLocId: string // Link to/Same as LogLocation.logLocId
}

// Type of log record   
export interface MessageLog {
  _id?: string
  appLogLocId: string, // Should be unique
  appData:
  {
    msgId: number | string,
    msgLogDateTime: Date | any,
    msgDateTime: Date | any,
    msgTag: string | string[],
    msgPayload: string | BaseMessage;
  }
}

// Type of log setting
export interface LogSetting {
  // Type of log storage. Default is "File" which means that the log messages are saved to file.
  storage: string;

  // If specified, it will keep a limited amount of messages. If not, no message is kept at run-time cache.
  cacheMessageLimit?: number;
  // Settings (1)
  setting?: {
    appId?: string,
    appName: string,
    logLocName: string,
    logLocId?: string,
    appLogLocId?: string,
    appLocName: string,
    appLogId?: string
  }

  customSetting?: {
    srv?: boolean,
    user?: string,
    password?: string,
    server?: string,
    database?: string
    url?: string // Full link if possible. Doesnt matter database or remote server
  }
}

export interface LoggingServiceInterface {
  // Set log setting
  init(settings: LogSetting): void;

  // Log a message to storage system. If managed to log, return MessageLog.appLogLocId, else return -1.
  // If AppLocation,LogLocation, AppLogLoc and AppProfile not provided, use back previous setting.
  subscribe(MessageLog: Observable<MessageLog | BaseMessage>, AppLocation?: AppLocation, LogLocation?: LogLocation, AppLogLoc?: AppLogLoc, AppProfile?: AppProfile): Promise<string | number>;

  // Filter message with these options.
  filter(
    search: { msgId: string } | { msgDateTime: MsgDateTime } | { msgTag: string } | { msgPayload: string }
  ): Promise<MessageLog[]>;

  convertCDMStoMessageLog(args: any, tag?: string | string[]): Promise<MessageLog>

  convertMessageLogtoCDMS(args: MessageLog): Promise<any>
}

export interface MsgDateTime {
  from: DateStructure,
  to: DateStructure
}

interface DateStructure {
  date: Date | string,
  hour?: string | number,
  minute?: string | number,
  second?: string | number
}