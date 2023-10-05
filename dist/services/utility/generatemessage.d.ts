import { fingerprintDataInterface, eventMessageInterface, locationTagInterface, locationRelationInterface } from '../../interfaces/message.interface';
import { PROCESS_STATUS } from '../../interfaces/constsetting';
export declare function zktecoFpMessage(fpUuid: string, fingerprintData: any, status: PROCESS_STATUS): fingerprintDataInterface;
export declare function handleResponseMessage(fpUuid: string, data: string): eventMessageInterface;
export declare function locationTagMessage(fpUuid: string): locationTagInterface;
export declare function locationTagMessage_ext(fpUuid: string, tagString: string): locationTagInterface;
export declare function locationRelationMessage(child: string, parent: string): locationRelationInterface;
export declare function generateDate(): string;
