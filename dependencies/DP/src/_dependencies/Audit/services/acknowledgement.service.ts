import { AnyObject } from "mongoose";
import { map, Observable, of, tap } from "rxjs";
import { Acknowledgemeent, AcknowledgementLogSetting } from "../type/acknowledgement.interface";
import { BaseMessage, Command, FisCreateMessageUtility, ResponseMessage, Uuid } from "../dependencies/msgutil/interface/export";
import { LogSetting, MessageLog } from "../dependencies/log/type/datatype";
import { LoggingService } from "../dependencies/log/interface/export";


/**
 * @deprecated The acknowledgement will be covered by MessageAuditorService.
 */
export class AcknowledgementService implements Acknowledgemeent {

    private messageUtil: FisCreateMessageUtility = new FisCreateMessageUtility("FisAppID/Name")
    private settings: LogSetting = {
        storage: '',
        setting: {
            appId: '',
            appName: '',
            logLocName: '',
            logLocId: '',
            appLogLocId: '',
            appLocName: '',
            appLogId: ''
        }
    }

    constructor(private logService?: LoggingService) {
        this.logService = new LoggingService()
    }

    public async init(settings: AcknowledgementLogSetting) {
        let logSetting: LogSetting = {
            ...settings,
            setting: {
                ...settings.setting,
                logLocName: "locationName2",
                appLocName: "appLocName2"
            }
        }
        this.settings = logSetting
        this.logService.init(logSetting)
    }

    public subscribe(obs: Observable<BaseMessage>): Observable<ResponseMessage> {
        let acknowledgementToken: Observable<ResponseMessage> = obs.pipe(
            map(
                incoming_msg => {
                    let emulatedId = "GeneratedFromMessageSync"
                    let emulatedRequest = this.messageUtil.getCommandMessage(emulatedId, Command.New, incoming_msg)
                    let finalResponse = this.messageUtil.getResponseMessage(emulatedId, { "Acknowledgement": 1 }, emulatedRequest)

                    return finalResponse
                }

            ))
        let acknowledgementTokenLogging: Observable<MessageLog> = obs.pipe(
            map(
                incoming_msg => {
                    let finalResponse:MessageLog = {
                        appLogLocId: new Uuid().generateId(),
                        appData: {
                            msgId: incoming_msg.header.messageID || new Uuid().generateId(),
                            msgLogDateTime: new Date(),
                            msgDateTime: new Date(),
                            msgTag: ['Acknowledgement'],
                            msgPayload: JSON.stringify(incoming_msg)
                        }
                    }
                    return finalResponse
                }
            )
        )
        this.logService.subscribe(acknowledgementTokenLogging) 
        return acknowledgementToken
    }
}