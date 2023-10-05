/* ----------------------        Simulate a stream of messages to be inserted or used by the test        ---------------------- */


import { Subject } from "rxjs";
import * as fs from "fs"
import { MessageLog } from "../type/datatype";
import { BaseMessage } from "../dependencies/msgutil/interface/export";

export class StreamingService {
    private messagesJSON: any = fs.readFileSync("payload.json")
    private messages = JSON.parse(this.messagesJSON)

    public stream(): Subject<BaseMessage> {
        let result: Subject<BaseMessage> = new Subject()
        let messages = this.messages
        let count = 0
        const intervalId = setInterval(() => {
            result.next(messages[count]);
            count++;
            if (count >= 20) {
                clearInterval(intervalId);
                result.complete();
            }
        }, 100)
        return result
    }

    public getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

}