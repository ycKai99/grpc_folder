"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const DP_controller_1 = require("../dependencies/DP/src/MessageDelivery/MessageTransmission/DP.controller");
let currentUCPId;
let applicationName = 'Notification Listener';
let notificationMessageFromUCP = new rxjs_1.Subject();
notificationMessageFromUCP.subscribe({
    next: (element) => {
        let data = element.data;
        if (data.header) {
            if (data.header.messageName == 'CDMS_Activities') {
                console.log(element);
            }
        }
    }
});
const DPC = new DP_controller_1.DomainProxyController();
let loginMessage = getLoginMessage();
getLoginResponseMessageSubscription().then((newUcpId) => {
    getNotificationMessageSubsription(newUcpId);
});
async function getLoginResponseMessageSubscription() {
    return new Promise((resolve, reject) => {
        let newUCPid;
        DPC.send(applicationName, loginMessage).subscribe({
            next: (responseMsg) => {
                console.log(`Received ${responseMsg.header.messageName}`);
                if (responseMsg.header.security.ucpId)
                    newUCPid = responseMsg.header.security.ucpId;
                console.log(`Assign new UCPid: ${newUCPid}`);
                resolve(newUCPid);
            },
            error: (err) => {
                console.error(err);
            },
            complete: () => {
                console.log(`terminating login repsonse subscription...`);
                console.log(`Login repsonse subscription terminated`);
            }
        });
    });
}
function getLoginMessage() {
    DPC.initialise(applicationName);
    let loginMessage = DPC.getMessageService().getLoginMessage();
    return loginMessage;
}
function getNotificationMessageSubsription(UCPid) {
    let notificationMessage = DPC.getMessageService().getSubscribeNotifMessage(UCPid, 'notification');
    DPC.subscribe(applicationName, notificationMessage).subscribe({
        next: (responseMsg) => {
            notificationMessageFromUCP.next(responseMsg);
        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
        }
    });
}
//# sourceMappingURL=testNotif.js.map