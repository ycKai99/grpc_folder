import { PROCESS_STATUS, RESPONSE_STATUS } from "./constsetting";
export interface fingerprintDataInterface {
    uuid: string;
    fpUuid: string;
    fpTemplate: string;
    registeredDate: Date;
    status: PROCESS_STATUS;
    location: string;
    personCode: string;
    position: string;
    masterfp?: boolean;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface eventMessageInterface {
    uuid: string;
    fpUuid?: string;
    registeredDate: Date;
    message: string;
    messageData?: string;
    messageType: "FPEevent";
    deviceNo: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationTagInterface {
    uuid: string;
    fpUuid: string;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationRelationInterface {
    uuid: string;
    child: string;
    parent: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface deviceTagInterface {
    uuid: string;
    deviceNo: string;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface personProfileInterface {
    uuid: string;
    personCode: string;
    personName: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface handleResponseInterface {
    status: RESPONSE_STATUS;
    message: any | any[];
    body?: any | any[];
}
