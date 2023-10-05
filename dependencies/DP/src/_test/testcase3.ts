import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { URLs } from '../_config/DP.config';
import { ConnectionInterface } from '../_interfaces/MD.connection.interface';
import { DomainProxyController } from '../MessageDelivery/MessageTransmission/DP.controller';
  
testLoginLogout_Http() 

// Test login>next>logout (Http with multiple requests)
export function testLoginLogout_Http() { 
  
  // Current session UCP_Id
  let currentUCPId: string = '';
  let app = 'Test Application'; 

  // Create instance
  const DPC = new DomainProxyController(); 
  DPC.initialise(app); 

  // Login message
  let msg = DPC.getMessageService().getLoginMessage();

  const settings: ConnectionInterface = {
    IdName: app,
    Description: 'Testing login',
    Type: 'Http',
    Target: URLs.NESTWS,
  };

  DPC.setConnection(settings);
  DPC.setIsConnectionStatusObserved(app, true);

  DPC.send(app, msg).subscribe({
    next(response_msg) {
      console.log('[TEST2]Got value ' + JSON.stringify(response_msg, null, 4));

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

        DPC.send(app, msg).subscribe({
          next(response_msg) {
            console.log(
              '[TEST2]Got value ' + JSON.stringify(response_msg, null, 4),
            );

            if (response_msg[0]) {
              response_msg = response_msg[0];
            }

            if (
              response_msg.data &&
              response_msg.data['StatusResponse'] &&
              response_msg.data['StatusResponse']['status'] &&
              response_msg.data['StatusResponse']['status'] == 1
            ) {
              console.log('[TEST2]The http test okay.');
            } else {
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

