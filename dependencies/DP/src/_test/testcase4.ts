import { timeout } from "rxjs";
import { URLs } from "../_config/DP.config";
import { ConnectionInterface } from "../_interfaces/MD.connection.interface";
import { DomainProxyController } from "../MessageDelivery/MessageTransmission/DP.controller";

testConnection()

/*  Test all Connection */
export async function testConnection() {

    // Current session UCP_Id
    let app = 'Test Application';
    // Create instance
    const DPC = new DomainProxyController();
    DPC.initialise(app);

    // Login message
    let msg = DPC.getMessageService().getLoginMessage();

    const httpConSettings: ConnectionInterface = {
        IdName: app,
        Description: 'Testing Http Connection',
        Type: 'Http',
        Target: URLs.NESTWS,
    };

    const webSocketConSettings: ConnectionInterface = {
        IdName: app,
        Description: 'Testing websocket Connection',
        Type: 'SocketIO',
        Target: URLs.NESTWS,
    };

    const microServiceConSettings: ConnectionInterface = {
        IdName: app,
        Description: 'Testing microService Connection',
        Type: 'Microservice',
        Target: URLs.NESTWS,
    };

    const grpcConSetting: ConnectionInterface = {
        IdName: app,
        Description: 'Testing GRPC Connection',
        Type: 'grpc',
        Target: URLs.UCP_GRPC,
    };

    async function testConnection(connectionArg: ConnectionInterface): Promise<void> {
        return new Promise((resolve, reject) => {
            let currentUCPId: string = '';

            DPC.setConnection(connectionArg);
            DPC.setIsConnectionStatusObserved(app, true);

            let obs
            let observableTimeout
            try {
                obs = DPC.send(app, msg)
                observableTimeout = obs.pipe(
                    timeout({ first: 60_000 })
                )
            }
            catch (e) {
                console.error(`[${connectionArg.Type}] error: ${e}`)
                resolve()
            }

            observableTimeout.subscribe({
                next(response_msg) {
                    // console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4));

                    if (
                        response_msg.data &&
                        response_msg.data['ServerUCP'] &&
                        response_msg.data['ServerUCP']['ucpId']
                    ) {
                        currentUCPId = response_msg.data['ServerUCP']['ucpId'];
                    }
                },
                error(err) {
                    console.log(`[${connectionArg.Type}] Big wrapper Something wrong occured: ${err.message}`)
                    resolve()

                },
                complete() {
                    if (currentUCPId) {
                        // Logout message
                        let msg =
                            DPC.getMessageService().getLogoutMessage(
                                currentUCPId,
                            );
                        let count = 0

                        DPC.send(app, msg).subscribe({
                            next(response_msg) {
                                count++
                                // console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4),);

                                if (response_msg[0]) {
                                    response_msg = response_msg[0];
                                }

                                if (
                                    response_msg.data &&
                                    response_msg.data['StatusResponse'] &&
                                    response_msg.data['StatusResponse']['status'] &&
                                    response_msg.data['StatusResponse']['status'] == 1
                                ) {
                                    console.log(`${connectionArg.Type} test is okay`);
                                } else {
                                    console.log(`Error in ${connectionArg.Type}`)
                                }
                            },
                            error(err) {
                                console.log(`[${connectionArg.Type}] Something wrong occured: ${err.message}`)
                            },
                            complete() {
                                console.log(`[${connectionArg.Type}]  Done observable`);
                                resolve()
                            },
                        });

                    }
                    console.log(`[${connectionArg.Type}] Done observable`);
                },
            });
        })
    }

    // // Test connection
    await testConnection(grpcConSetting)
    await testConnection(httpConSettings)
    await testConnection(webSocketConSettings)
    await testConnection(microServiceConSettings)
}
