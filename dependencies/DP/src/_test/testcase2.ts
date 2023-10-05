import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { URLs } from '../_config/DP.config';
import { ConnectionInterface } from '../_interfaces/MD.connection.interface'; 
import { DomainProxyController } from '../MessageDelivery/MessageTransmission/DP.controller';
  
testLoginLogout_WebSocket()
 
// Test login>next>logout (Same socket channel multiple requests)
export  function testLoginLogout_WebSocket() {

  // Current session UCP_Id
  let currentUCPId: string = '';
  let app = 'Test Application'; 

  // Create instance
  const DPC = new DomainProxyController(); 
  DPC.initialise(app); 

  const settings: ConnectionInterface = {
    IdName: app,
    Description: 'Testing login',
    Type: 'SocketIO',
    Target: URLs.NESTWS,
  };

  DPC.setConnection(settings);

  // Login message
  let msg = DPC.getMessageService().getLoginMessage(); 

  DPC.send('', msg).subscribe({
    next(response_msg) {
      console.log('[TEST1]Got value ' + JSON.stringify(response_msg, null, 4));

      if (
        response_msg.data &&
        response_msg.data['ServerUCP'] &&
        response_msg.data['ServerUCP']['ucpId']
      ) {
        currentUCPId = response_msg.data['ServerUCP']['ucpId'];
      }

      if (currentUCPId) {
        // Logout message
        msg =
          DPC.getMessageService().getLogoutMessage(
            currentUCPId,
          );

        DPC.send('', msg).subscribe({
          next(response_msg) {
            console.log(
              '[TEST1]Got value ' + JSON.stringify(response_msg, null, 4),
            );

            if (
              response_msg.data &&
              response_msg.data['StatusResponse'] &&
              response_msg.data['StatusResponse']['status'] &&
              response_msg.data['StatusResponse']['status'] == 1
            ) {
              console.log('[TEST1]The default socket test okay.');
            } else {
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
