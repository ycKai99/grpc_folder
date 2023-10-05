import { map, Observable, of, tap } from "rxjs";
import { IncomingMessageServiceInterface } from "../type/datatype";
import { LoggingService } from "../dependencies/log/interface/export";
import { LogSetting, MessageLog } from "../dependencies/log/type/datatype";
import { BaseMessage, Uuid } from "../dependencies/msgutil/interface/export";

/**
 * @deprecated The logging is now supported by the Fis-Logging library.
 */
export class IncomingMessageService implements IncomingMessageServiceInterface {

    constructor(private logService?: LoggingService) {
        this.logService = new LoggingService()
    }

    private settings: LogSetting & { incomingObservable: Observable<BaseMessage>; } = {
        storage: '',
        setting: {
            appId: '',
            appName: '',
            logLocName: '',
            logLocId: '',
            appLogLocId: '',
            appLocName: '',
            appLogId: ''
        },
        incomingObservable: null
    }


    /* This function is mainful used for setting the log setting as well as transforming the messages
    into log messages and then storing them in the desiganted location of storage as specified. */
    public init(settings: LogSetting & { incomingObservable: Observable<BaseMessage>; }): void {

        // Restructuring the settings. I think they were some trouble doing this last time
        let newSetting: any = settings
        newSetting.setting = {
            ...this.settings.setting,
            ...settings.setting,
            customSetting: {
                ...this.settings.customSetting,
                ...settings.customSetting,
            }
        }

        this.settings = newSetting // Become stateful???

        // Transform incoming observables into Observable<MessageLog> to be logged
        let transformedOBS: Observable<MessageLog> = settings.incomingObservable.pipe(
            map(message => {
                let finalResponse: MessageLog = {
                    appLogLocId: new Uuid().generateId(),
                    appData: {
                        msgId: message.header.messageID || new Uuid().generateId(),
                        msgLogDateTime: new Date(),
                        msgDateTime: new Date(),
                        msgTag: ['Incoming'],
                        msgPayload: JSON.stringify(message)
                    }
                }
                return finalResponse
            })
        )

        // Once the messages has been transformed, then the logging can be executed
        this.logService.init(this.settings).then(() => {
            this.logService.subscribe(transformedOBS)
        }).catch((e) => console.error(e))

    }
}