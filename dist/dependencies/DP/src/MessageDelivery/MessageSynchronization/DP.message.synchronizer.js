"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageState = exports.MessageSynchronisationClass = void 0;
class MessageSynchronisationClass {
    setAppName(appName) {
        this.appName = appName;
    }
    setController(dpc) {
        this.dpc = dpc;
    }
    setupConsumer(ucpId, dpc, appName) {
        if (dpc) {
            this.setController(dpc);
        }
        if (appName) {
            this.setAppName(appName);
        }
        if (!this.dpc) {
            console.log("Error getting Domain Proxy Controller.");
        }
        else {
            let msg = this.dpc.getMessageService().getQueryMessage_ext(ucpId, JSON.stringify({
                MessagesStatus: this.messagesStatusList
            }), "UCP");
            this.dpc.send(this.appName, msg).subscribe((msg) => {
                this.consumer(msg);
            });
        }
    }
    consumer(msg) {
        let data = msg.data['MessagesStatus'];
        data.forEach((message) => {
            let ind = this.findReference(message.id);
            if (!ind) {
                if (message.status == messageState.emitted) {
                    this.messagesStatusList.push({
                        id: message.id,
                        status: messageState.started
                    });
                }
                else if (message.status == messageState.clear) { }
            }
            else {
                if (message.status == messageState.emitted) {
                    if (this.messagesStatusList[ind].status == messageState.emitted) {
                        this.messagesStatusList[ind].status = messageState.clear;
                    }
                }
                else if (message.status == messageState.clear) {
                    this.messagesStatusList.splice(ind, 1);
                }
            }
        });
    }
    producer(msg) {
        let data = msg.data['MessagesStatus'];
        data.forEach((message) => {
            let ind = this.findReference(message.id);
            if (!ind) {
                if (message.status == messageState.started) {
                    this.messagesStatusList.push({
                        id: message.id,
                        status: messageState.emitted
                    });
                }
                else if (message.status == messageState.clear) { }
            }
            else {
                if (message.status == messageState.emitted) {
                    if (this.messagesStatusList[ind].status == messageState.emitted) { }
                }
                else if (message.status == messageState.clear) {
                    this.messagesStatusList.splice(ind, 1);
                }
            }
        });
    }
    findReference(id) {
        let ind = this.messagesStatusList.findIndex((msg) => {
            return msg.id = id;
        });
        return ind || null;
    }
}
exports.MessageSynchronisationClass = MessageSynchronisationClass;
var messageState;
(function (messageState) {
    messageState["started"] = "started";
    messageState["emitted"] = "emitted";
    messageState["clear"] = "clear";
})(messageState = exports.messageState || (exports.messageState = {}));
//# sourceMappingURL=DP.message.synchronizer.js.map