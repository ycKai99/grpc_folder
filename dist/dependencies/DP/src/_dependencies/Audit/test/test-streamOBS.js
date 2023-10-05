"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const rxjs_1 = require("rxjs");
const fs = require("fs");
class StreamingService {
    constructor() {
        this.messagesJSON = fs.readFileSync("testRequest.json");
        this.messages = JSON.parse(this.messagesJSON);
    }
    stream() {
        let result = new rxjs_1.Subject();
        let messages = this.messages;
        let count = 0;
        const intervalId = setInterval(() => {
            result.next(messages[count]);
            count++;
            if (count >= 5) {
                clearInterval(intervalId);
                result.complete();
            }
        }, 1000);
        return result;
    }
}
exports.StreamingService = StreamingService;
//# sourceMappingURL=test-streamOBS.js.map