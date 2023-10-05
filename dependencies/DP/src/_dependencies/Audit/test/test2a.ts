import { AcknowledgementService } from "../services/acknowledgement.service";
import { StreamingService } from "./test-streamOBS";
import { MessageAuditorService } from "../services/message-auditor.service";
import { IncomingMessageService } from "../services/incomingMessage.service";
import { map, Observable, take } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
import { LogSetting } from "../dependencies/log/type/datatype";
const incoming = new IncomingMessageService()
const syncrhonize = new MessageAuditorService()
const acknowledge = new AcknowledgementService()
const streamService = new StreamingService()

/* --------------  TEST -------------------- */
// change payload into Observable<BaseMessage>
const payload: Observable<BaseMessage> = streamService.stream().pipe(take(3));

// Configure Log Setting
let storage: LogSetting = {
    storage: "MongoDB",
    cacheMessageLimit: 0,
    setting: {
        appName: 'Default from client',
        appLocName: 'To be generated in client',
        logLocName: 'To be generated in client',
    },
    customSetting: {
        srv: true,
        user: "testDB",
        password: "h1nt1OyXw6QeUnzS",
        server: "cluster0.29sklte.mongodb.net",
        database: "log",
      }
}
let dataSet: LogSetting & { incomingObservable: Observable<BaseMessage> } = {
    storage: storage.storage,
    setting: storage.setting,
    customSetting: storage.customSetting,
    incomingObservable: payload
}

incoming.init(dataSet)
