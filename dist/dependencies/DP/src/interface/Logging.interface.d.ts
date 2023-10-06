import { BaseMessage } from '../dependencies/FISAppMessageJSUtility/interface/export';
export interface LogType {
    id: string;
    date: Date;
    data: string | BaseMessage;
    dataTags: string[];
}
export interface LogSetting {
    storage: string;
}
export interface LoggingServiceInterface {
    init(settings: LogSetting): void;
    addToLog(message: string | BaseMessage, processTags: string[]): string;
    findLogs(search: {
        id: string;
    } | {
        date: string;
    } | {
        tag: string;
    }): LogType[];
}
