import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { LoggingService } from "../services/logging-service"
import { MessageLog, LogSetting } from "../type/datatype"
import * as fs from "fs"
import { StreamingService } from "./test-streamOBS";
import { Uuid } from "../dependencies/msgutil/dependencies/dependencies";

const log = new LoggingService();
const streamService = new StreamingService().stream()

let sampleStreamMessages: Observable<MessageLog> = streamService.pipe(
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
  }
  )
)

// Declare storage type
const storage: LogSetting = {
  cacheMessageLimit : 10,
  storage: "File",
  setting: {
    appName: 'Default from client',
    appLocName: 'To be generated in client',
    logLocName: 'To be generated in client',
  }
}

/* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
/* Test Case 2: Testing for file storage == "File" with streaming datas. */
try {
  log.init(storage).then((data) => {
    log.subscribe(sampleStreamMessages).then((result) => {
      log.filter({ msgId: "6c162cd3-d42d-4ab4-8882-0001"
       }).catch(() => console.log(`Failed to resolve filter`))
    }).catch(() => console.log(`Failed to resolve stream data`))
  }).catch(() => console.log(`Failed to resolve init`))

}
catch (err) {
  console.log(err)
  throw new Error("service is broken")
}
