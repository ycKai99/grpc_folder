import { IdType } from "../../_dependencies/DP/src/interface/export";
import { PROCESS_STATUS } from '../../_interface/fingerprint.constsetting';
import { fingerprintDataInterface, eventMessageInterface, locationTagInterface, locationRelationInterface, deviceTagInterface, personProfileInterface } from '../../_interface/fingerprintdata.interface';
export declare function zktecoFpMessage(fingerprintData: any, status: PROCESS_STATUS): fingerprintDataInterface;
export declare function fpEventMessage(fpUuid: IdType, data: string, deviceNo: string): eventMessageInterface;
export declare function locationTagMessage(fpUuid: IdType): locationTagInterface;
export declare function locationTagMessage_ext(fpUuid: IdType, tagString: string): locationTagInterface;
export declare function locationRelationMessage(child: string, parent: string): locationRelationInterface;
export declare function deviceTagMessage(deviceNo: string): deviceTagInterface;
export declare function personProfileMessage(personIdentifier: string, personName: string): personProfileInterface;
export declare function generateDate(): string;
