import { FisCreateMessageUtility } from '../_dependencies/FISAppMessageJSUtility/interface/export';
import { MessageDeliveryInterface } from './MD.interface';

export interface ConnectionInterface {
  // Identifier Name that is Unique
  IdName: string;
  // Description
  Description: string;
  // Type
  Type: 'SocketIO' | 'Http' | 'Microservice' | 'grpc';
  // Target
  Target: string;
}