import { AcknowledgementService } from "../services/acknowledgement.service";
import { StreamingService } from "./test-streamOBS";
import { MessageAuditorService } from "../services/message-auditor.service";
import { IncomingMessageService } from "../services/incomingMessage.service";
import { map, Observable } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";
const incoming = new IncomingMessageService()
const acknowledge = new AcknowledgementService()
const syncrhonize = new MessageAuditorService()
const streamService = new StreamingService()

/* --------------  TEST -------------------- */
// change payload into Observable<BaseMessage>
const payload: Observable<BaseMessage> = streamService.stream();

// Configure Log Setting
let storage: LogSetting = {
    storage: "File",
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    }
}
let dataSet: LogSetting & { incomingObservable: Observable<BaseMessage> } = {
    storage: storage.storage,
    setting: storage.setting,
    customSetting: storage.customSetting,
    incomingObservable: payload
}

incoming.init(dataSet)

// acknowledge.init(storage).then(() => {
//     acknowledge.subscribe(dataSet.incomingObservable)
// })

