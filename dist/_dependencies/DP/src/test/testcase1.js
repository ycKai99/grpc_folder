"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLoginSubscribe_Http = void 0;
const DP_controller_1 = require("../services/DP.controller");
testLoginSubscribe_Http();
// Test login>next>subscribe (Http with multiple requests)
function testLoginSubscribe_Http() {
    // Current session UCP_Id
    let currentUCPId = '';
    let app = 'Test Application';
    // Create instance
    const DPC = new DP_controller_1.DomainProxyController();
    DPC.initialise(app);
    // Login message
    let msg = DPC.getMessageService().getLoginMessage();
    // const settings: ConnectionInterface = {
    //   IdName: app,
    //   Description: 'Testing login',
    //   Type: 'Http',
    //   Target: URLs.NESTWS,
    // };
    //DPC.setConnection(settings);
    //DPC.setIsConnectionStatusObserved(app, true);
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
                // Subscribe message
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
//# sourceMappingURL=testcase1.js.map