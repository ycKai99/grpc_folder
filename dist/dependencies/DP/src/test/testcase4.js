"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const rxjs_1 = require("rxjs");
const DP_config_1 = require("../config/DP.config");
const DP_controller_1 = require("../services/DP.controller");
testConnection();
/*  Test all Connection */
async function testConnection() {
    // Current session UCP_Id
    let app = 'Test Application';
    // Create instance
    const DPC = new DP_controller_1.DomainProxyController();
    DPC.initialise(app);
    // Login message
    let msg = DPC.getMessageService().getLoginMessage();
    const httpConSettings = {
        IdName: app,
        Description: 'Testing Http Connection',
        Type: 'Http',
        Target: DP_config_1.URLs.NESTWS,
    };
    const webSocketConSettings = {
        IdName: app,
        Description: 'Testing websocket Connection',
        Type: 'SocketIO',
        Target: DP_config_1.URLs.NESTWS,
    };
    const microServiceConSettings = {
        IdName: app,
        Description: 'Testing microService Connection',
        Type: 'Microservice',
        Target: DP_config_1.URLs.NESTWS,
    };
    const grpcConSetting = {
        IdName: app,
        Description: 'Testing GRPC Connection',
        Type: 'grpc',
        Target: DP_config_1.URLs.NESTWS,
    };
    async function testConnection(connectionArg) {
        return new Promise((resolve, reject) => {
            let currentUCPId = '';
            DPC.setConnection(connectionArg);
            DPC.setIsConnectionStatusObserved(app, true);
            let obs;
            let observableTimeout;
            try {
                obs = DPC.send(app, msg);
                observableTimeout = obs.pipe(rxjs_1.timeout({ first: 15000 }));
            }
            catch (e) {
                console.error(`[${connectionArg.Type}] error: ${e}`);
                resolve();
            }
            observableTimeout.subscribe({
                next(response_msg) {
                    // console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4));
                    if (response_msg.data &&
                        response_msg.data['ServerUCP'] &&
                        response_msg.data['ServerUCP']['ucpId']) {
                        currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                    }
                },
                error(err) {
                    console.log(`[${connectionArg.Type}] Big wrapper Something wrong occured: ${err.message}`);
                    resolve();
                },
                complete() {
                    if (currentUCPId) {
                        // Logout message
                        msg =
                            DPC.getMessageService().getLogoutMessage(currentUCPId);
                        let count = 0;
                        DPC.send(app, msg).subscribe({
                            next(response_msg) {
                                count++;
                                // console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4),);
                                if (response_msg[0]) {
                                    response_msg = response_msg[0];
                                }
                                if (response_msg.data &&
                                    response_msg.data['StatusResponse'] &&
                                    response_msg.data['StatusResponse']['status'] &&
                                    response_msg.data['StatusResponse']['status'] == 1) {
                                    console.log(`${connectionArg.Type} test is okay`);
                                }
                                else {
                                    console.log(`Error in ${connectionArg.Type}`);
                                }
                            },
                            error(err) {
                                console.log(`[${connectionArg.Type}] Something wrong occured: ${err.message}`);
                            },
                            complete() {
                                console.log(`[${connectionArg.Type}]  Done observable`);
                                resolve();
                            },
                        });
                    }
                    console.log(`[${connectionArg.Type}] Done observable`);
                },
            });
        });
    }
    // // Test connection
    await testConnection(httpConSettings);
    await testConnection(grpcConSetting);
    await testConnection(webSocketConSettings);
    await testConnection(microServiceConSettings);
}
exports.testConnection = testConnection;
//# sourceMappingURL=testcase4.js.map