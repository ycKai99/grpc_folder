"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLoginLogout_WebSocket = void 0;
const DP_config_1 = require("../config/DP.config");
const DP_controller_1 = require("../services/DP.controller");
testLoginLogout_WebSocket();
// Test login>next>logout (Same socket channel multiple requests)
function testLoginLogout_WebSocket() {
    // Current session UCP_Id
    let currentUCPId = '';
    let app = 'Test Application';
    // Create instance
    const DPC = new DP_controller_1.DomainProxyController();
    DPC.initialise(app);
    const settings = {
        IdName: app,
        Description: 'Testing login',
        Type: 'SocketIO',
        Target: DP_config_1.URLs.NESTWS,
    };
    DPC.setConnection(settings);
    // Login message
    let msg = DPC.getMessageService().getLoginMessage();
    DPC.send('', msg).subscribe({
        next(response_msg) {
            console.log('[TEST1]Got value ' + JSON.stringify(response_msg, null, 4));
            if (response_msg.data &&
                response_msg.data['ServerUCP'] &&
                response_msg.data['ServerUCP']['ucpId']) {
                currentUCPId = response_msg.data['ServerUCP']['ucpId'];
            }
            if (currentUCPId) {
                // Logout message
                msg =
                    DPC.getMessageService().getLogoutMessage(currentUCPId);
                DPC.send('', msg).subscribe({
                    next(response_msg) {
                        console.log('[TEST1]Got value ' + JSON.stringify(response_msg, null, 4));
                        if (response_msg.data &&
                            response_msg.data['StatusResponse'] &&
                            response_msg.data['StatusResponse']['status'] &&
                            response_msg.data['StatusResponse']['status'] == 1) {
                            console.log('[TEST1]The default socket test okay.');
                        }
                        else {
                            console.log('[TEST1]Error in default socket test.');
                        }
                    },
                    error(err) {
                        console.error('[TEST1]Something wrong occurred: ' + err.message);
                    },
                    complete() {
                        console.log('[TEST1]Done observable 2.');
                    },
                });
            }
        },
        error(err) {
            console.error('[TEST1]Something wrong occurred: ' + err.message);
        },
        complete() {
            console.log('[TEST1]Done observable 1.');
        },
    });
}
exports.testLoginLogout_WebSocket = testLoginLogout_WebSocket;
//# sourceMappingURL=testcase2.js.map