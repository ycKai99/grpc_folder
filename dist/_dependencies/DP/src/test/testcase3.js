"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLoginLogout_Http = void 0;
const DP_config_1 = require("../config/DP.config");
const DP_controller_1 = require("../services/DP.controller");
testLoginLogout_Http();
// Test login>next>logout (Http with multiple requests)
function testLoginLogout_Http() {
    // Current session UCP_Id
    let currentUCPId = '';
    let app = 'Test Application';
    // Create instance
    const DPC = new DP_controller_1.DomainProxyController();
    DPC.initialise(app);
    // Login message
    let msg = DPC.getMessageService().getLoginMessage();
    const settings = {
        IdName: app,
        Description: 'Testing login',
        Type: 'Http',
        Target: DP_config_1.URLs.NESTWS,
    };
    DPC.setConnection(settings);
    DPC.setIsConnectionStatusObserved(app, true);
    DPC.send(app, msg).subscribe({
        next(response_msg) {
            console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4));
            if (response_msg.data &&
                response_msg.data['ServerUCP'] &&
                response_msg.data['ServerUCP']['ucpId']) {
                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
            }
            if (currentUCPId) {
                // Logout message
                msg =
                    DPC.getMessageService().getLogoutMessage(currentUCPId);
                DPC.send(app, msg).subscribe({
                    next(response_msg) {
                        console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4));
                        if (response_msg[0]) {
                            response_msg = response_msg[0];
                        }
                        if (response_msg.data &&
                            response_msg.data['StatusResponse'] &&
                            response_msg.data['StatusResponse']['status'] &&
                            response_msg.data['StatusResponse']['status'] == 1) {
                            console.log('[TEST2]The http test okay.');
                        }
                        else {
                            console.log('[TEST2]Error in http test.');
                        }
                    },
                    error(err) {
                        console.error('[TEST2]Something wrong occurred: ' + err.message);
                    },
                    complete() {
                        console.log('[TEST2]Done observable 2.');
                    },
                });
            }
        },
        error(err) {
            console.error('[TEST2]Something wrong occurred: ' + err.message);
        },
        complete() {
            console.log('[TEST2]Done observable 1.');
        },
    });
}
exports.testLoginLogout_Http = testLoginLogout_Http;
//# sourceMappingURL=testcase3.js.map