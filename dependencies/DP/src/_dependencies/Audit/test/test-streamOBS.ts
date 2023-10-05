/* ----------------------        Simulate a stream of messages to be inserted or used by the test        ---------------------- */


import { Subject } from "rxjs";
import * as fs from "fs"
import { BaseMessage } from "../dependencies/msgutil/interface/export";

export class StreamingService {
    private messagesJSON: any = fs.readFileSync("testRequest.json")
    private messages = JSON.parse(this.messagesJSON)

    public stream(): Subject<BaseMessage> {
        let result: Subject<BaseMessage> = new Subject()
        let messages = this.messages
        let count = 0
        const intervalId = setInterval(() => {
            result.next(messages[count]);
            count++;
            if (count >= 5) {
                clearInterval(intervalId);
                result.complete();
            }
        }, 1000)
        return result
    }
}