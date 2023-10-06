import { eventTypes } from "../handlers_manager";
import { IdType } from "../_dependencies/DP/src/interface/export";
import { PROCESS_STATUS, RESPONSE_STATUS } from "./fingerprint.constsetting";
export interface fingerprintDataInterface {
    uuid: IdType;
    fpUuid: IdType;
    fpTemplate: string;
    registeredDate: Date;
    status: PROCESS_STATUS;
    location: string;
    personIdentifier: string;
    position: string;
    masterfp?: boolean;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface eventMessageInterface {
    uuid: IdType;
    fpUuid?: IdType;
    registeredDate: Date;
    message: string;
    messageData?: string;
    messageType: "FPEevent";
    deviceNo: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationTagInterface {
    uuid: IdType;
    fpUuid: IdType;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationRelationInterface {
    uuid: IdType;
    child: string;
    parent: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface deviceTagInterface {
    uuid: IdType;
    deviceNo: string;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface personProfileInterface {
    uuid: IdType;
    pers_name: string;
    pers_new_ic: string;
    pers_sex: string;
    pers_code: string;
    pers_dob: string;
    pers_race: string;
    pers_religion: string;
    pers_marital: string;
    pers_nationality: string;
    orgn_code: string;
    orgn_full_name: string;
    emp_id?: number;
    emp_employ_type: string;
    emp_number?: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface fingerprintLoginAccess {
    uuid: string;
    personIdentifier: string;
    loginAccess: boolean;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface handlePromiseRequestedInterface {
    eventTypeStart: eventTypes;
    eventTypeEnd: eventTypes;
    eventMessage: string | any;
}
export interface handleResponseInterface {
    status: RESPONSE_STATUS;
    message: any | any[];
    body?: any | any[];
}
