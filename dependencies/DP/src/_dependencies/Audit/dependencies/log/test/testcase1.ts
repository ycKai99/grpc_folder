import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { LoggingService } from "../services/logging-service"
import { MessageLog, LogSetting, MsgDateTime } from "../type/datatype"
import * as fs from "fs"
import { StreamingService } from "./test-streamOBS";
import { BaseMessage, Uuid } from "../dependencies/msgutil/dependencies/dependencies";
const log = new LoggingService();

/* Get message data from testStreamOBS file for testing */
const streamService = new StreamingService()


// Declare storage type
const storage: LogSetting = {
  cacheMessageLimit: 0,
  storage: "MongoDB",
  setting: {
    appName: 'Default from client',
    appLocName: 'To be generated in client',
    logLocName: 'To be generated in client',
  },
  // customSetting: {``
  //   user: "somongo",
  //   password: "so*@2212#",
  //   server: "swopt.com:27017/logs",
  //   collection: "logs"
  // }
  customSetting: {
    server: "192.168.100.59:27017",
    database: 'fromEnzo'
    }
}




let sampleStreamMessages: Observable<MessageLog> = streamService.stream().pipe(
  map((message: any) => {
    let finalResponse: MessageLog = {
      appLogLocId: new Uuid().generateId(),
      appData: {
        msgId: message.header.messageID || new Uuid().generateId(),
        msgLogDateTime: new Date(),
        msgDateTime: new Date(),
        msgTag: ['Incoming', 'Outgoing'],
        msgPayload: JSON.stringify(message)
      }
    }
    return finalResponse
  })
)

/* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
/* TestCase 1: Test for file storage == "MongoDB". */
// try {
//   log.init(storage).then(() => {
//     log.subscribe(sampleStreamMessages).then(() => {
//       log.filter({ msgTag: "Swopt" }).catch(() => console.log(`Failed to resolve filter`))
//     }).catch(() => console.log(`Failed to resolve stream data`))
//   }).catch(() => console.log(`Failed to resolve init`))


// }
// catch (err) {
//   console.log(err)
//   throw new Error("service is broken")
// }

/*  Test for when cache is more than 0 : Filter will search from local instance */
// This should all return the first data
// log.init(storage).then(() => {
//   log.filter({ msgPayload: "15cda97b6111"}) // partial header.messageID of 1st object
// }).then(() => {
//   log.filter({ msgPayload: "FromFirstRequestData"}) // partial header.security.ucpId of 1st object
// }).then(() => {
//   log.filter({ msgPayload: "4aba-9999-1111"}) // partial data from data.data.appLogLocId of 1st object
// }).then(() => {
//   log.filter({ msgPayload: "Molestias facilis iusto similique" }) // partial data from data.data.appData.msgPayload of 1st object
// }).then(() => {
//   log.filter({ msgPayload: "software" }) // partial data from data.data.uuuappData.msgTag of 1st object
// }).then(() => {
//   log.filter({ msgDateTime: '2023-03-10'}) // Date from 1st object
// }).then(() => {
//   log.filter({ msgTag: "Incoming"}) // returns all value
// })

/*  Test for when cache is 0 : Filter will search from mongo database */
// This should all return the 10th data
// log.init(storage).then(() => {
//   log.filter({ msgPayload: "15cda9710000"}) // partial header.messageID of 1oth object
// }).then(() => {
//   log.filter({ msgPayload: "FisSTAFF"}) // partial messageProducerInformation of 1oth object
// }).then(() => {
//   log.filter({ msgPayload: "9718-4aba-9999-0001"}) // partial data from data.data.appLogLocId of 1oth object
// }).then(() => {
//   log.filter({ msgPayload: "sequi quod voluptatum nam" }) // partial data from data.data.appData.msgPayload of 1oth object
// }).then(() => { 
//   log.filter({ msgPayload: "swopt" }) // partial data from data.data.appData.msgTag of 1oth object
// }).then(() => {
//   log.filter({ msgDateTime: '2023-03-10'}) // Date from 10th object
// }).then(() => {
//   log.filter({ msgTag: "Swopt"}) // returns all value
// })


/*  Test for msgDateTime range */
let filter: MsgDateTime = {
  from: {
    date: "2023-03-01",
    hour: '00',
    minute: '00',
    second: '00'
  },
  to: {
    date: "2023-04-13",
    hour: '23',
    minute: '59',
    second: '59'
  }
}

function searchData(args: LogSetting) {
  log.init(args).then(() => {
    // log.filter({msgPayload: "71d350e4-5cff-4b37"})
    log.filter({msgTag : "gg"})
  })
}

searchData(storage)