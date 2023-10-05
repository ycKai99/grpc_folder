import { Subject } from "rxjs";
import { BaseMessage } from "../dependencies/msgutil/interface/export";
export declare class StreamingService {
    private messagesJSON;
    private messages;
    stream(): Subject<BaseMessage>;
}
