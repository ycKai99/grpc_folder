"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DP_controller_1 = require("../_dependencies/DP/src/services/DP.controller");
/* Declare all the relevant variables for the notification subscription of this test case */
let currentUCPId;
let applicationName = "test app";
// Create instance of DPC
const DPC = new DP_controller_1.DomainProxyController();
DPC.initialise(applicationName);
// Login
let msg = DPC.getMessageService().getLoginMessage();
// Manual
msg.data = {
    "authenticationType": "serverUser",
    "idToken": "UCP Server",
};
let subs = DPC.send(applicationName, msg).subscribe({
    next: (responseMsg) => {
        let UCPid = responseMsg.data['ServerUCP']['ucpId'];
        // Subscribe to notification data
        let msg = DPC.getMessageService().getSubscribeNotifMessage(UCPid, 'notification');
        let subs = DPC.subscribe(applicationName, msg).subscribe({
            next: (responseMsg) => {
                if (responseMsg.data) {
                    console.log("Detected this message");
                    console.log(responseMsg.header.messageID);
                    // Check if it is fingerprint notification
                    if (responseMsg['data']['data']
                        && responseMsg['data']['data']['NotificationMicroserviceData']
                        && responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage']
                        && responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage']['FingerprintData']) {
                        // Get the fingerprintData notified
                        let fingerprintData = responseMsg['data']['data']['NotificationMicroserviceData']['uiMessage']['FingerprintData'];
                        console.log("FingerprintData here");
                        console.log(JSON.stringify(fingerprintData, null, 2));
                        // Get my first data, can unscribe and close my testing case??
                        subs.unsubscribe();
                    }
                }
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                // Just leaving the block here to do whatever
            }
        });
        // Send test data test notification 
        let msg2 = DPC.getMessageService().getNotificationMessage(UCPid, {
            "FingerprintData": {
                "type": "FingerprintRegistrationData",
                "<fingerprintrawdata1>": "XXXXXXXXXXXXXXXXXXXXYYYYYYYYYYYYYYYY",
                "<fingerprintrawdata2>": "123456",
                "<person_name>": "1234567",
                "<person_id>": "12345678",
                "<person_IC>": "12345679",
                "<operation>": "new?"
                //...
            }
        });
        console.log("Notified this message");
        console.log(msg.header.messageID);
        console.log(msg2);
        // Emit notification to server
        DPC.emit(applicationName, msg2);
    },
    error: (err) => {
        console.log(err);
    },
    complete: () => {
    }
});
//# sourceMappingURL=test3.js.map