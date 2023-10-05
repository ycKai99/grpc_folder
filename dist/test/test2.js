"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLoginSubscribe_Http = void 0;
const DP_controller_1 = require("../dependencies/DP/src/MessageDelivery/MessageTransmission/DP.controller");
testLoginSubscribe_Http();
function testLoginSubscribe_Http() {
    let currentUCPId = '';
    let app = 'Test Application';
    const DPC = new DP_controller_1.DomainProxyController();
    DPC.initialise(app);
    let msg = DPC.getMessageService().getLoginMessage();
    DPC.send(app, msg).subscribe({
        next(response_msg) {
            console.log('[TEST3]Got value ' + JSON.stringify({ response_msg }, null, 4));
            if (response_msg.data &&
                response_msg.data['ServerUCP'] &&
                response_msg.data['ServerUCP']['ucpId']) {
                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
            }
            else {
                currentUCPId = null;
            }
            if (currentUCPId) {
                let msg = DPC.getMessageService().getSubscribeNotifMessage(currentUCPId, 'serviceProvider');
                console.log('[TEST3]Keep receiving response...');
                DPC.subscribe(app, msg).subscribe({
                    next(response_msg) {
                        console.log(JSON.stringify(response_msg.data, null, 4));
                    },
                    error(err) {
                        let message = err.message || err;
                        console.error('[TEST3]Something wrong occurred: ' + message);
                    },
                    complete() {
                        console.log('[TEST3]Done observable 2.');
                    },
                });
            }
        },
        error(err) {
            let message = err.message || err;
            console.error('[TEST3]Something wrong occurred: ' + message);
        },
        complete() {
            console.log('[TEST3]Done observable 1.');
        },
    });
}
exports.testLoginSubscribe_Http = testLoginSubscribe_Http;
//# sourceMappingURL=test2.js.map