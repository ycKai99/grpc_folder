import { of } from "rxjs";
import { LoggingService } from "../services/logging-service"
import { LogSetting } from "../type/datatype"
import * as fs from "fs"
const log = new LoggingService();

// Declare storage type
const storage: LogSetting = { 
  storage: "File",
  setting: {
    appName: 'Default from client',
    appLocName: 'To be generated in client',
    logLocName: 'To be generated in client',
  },
  // customSetting: {
  //   user: "somongo",
  //   password: "so*@2212#",
  //   server: "swopt.com:27017/logs",
  //   collection: "logs"
  // }
  customSetting: {
    server: "localhost:27017",
    database: "logs"
  }
} 


/* Get message data from messages.json file for testing */
let messagesJSON: any = fs.readFileSync('messages.json')
let messages = JSON.parse(messagesJSON)

const msg1 = messages[0]
const msg2 = messages[1]
const msg3 = messages[2]

// Complete Observables set
let sampleMessages = of(msg1, msg2, msg3)


// Write you own testing here
try {
  /* -------------------------------- EXAMPLE FOR SETTING STORAGE -------------------------------- */
  /* Test Case 4: Filtering via msgDateTime and return array of results matching the argument*/
  log.init(storage).then(()=>{
    log.subscribe(sampleMessages).then(() => {
      log.filter({msgDateTime: "2022-07-15"}).catch(()=> console.log(`Failed to resolve filter`))
    }).catch(() => console.log(`Failed to resolve stream data`))
  }).catch(() => console.log(`Failed to resolve init`))

}
catch (err) {
  console.log(err)
  throw new Error("service is broken")
}
