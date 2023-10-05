import { PROCESS_STATUS } from "./constsetting";
export interface fpTemplateSchema {
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
export interface eventMessageSchema {
    uuid: string;
    fpUuid?: string;
    registeredDate: Date;
    message: string;
    messageData?: string;
    messageType: string;
    deviceNo: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationTagSchema {
    uuid: string;
    fpUuid: string;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface locationRelationSchema {
    uuid: string;
    child: string;
    parent: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface deviceTagSchema {
    uuid: string;
    deviceNo: string;
    location: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface personProfileSchema {
    pers_id?: string;
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
export interface iCalendar {
    uuid: string;
    vCalendar: {
        prodId?: string;
        name: string;
        version?: 2.0 | string;
        calScale?: string | 'GREGORIAN';
        vEvent?: iEvent[] | null;
    };
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface iEvent {
    uuid: string;
    start: Date;
    end: Date;
    summary: string;
    description: string;
    location?: string;
    url?: string;
    categories?: string[];
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface EventInCalendarInformation {
    uuid: string;
    eventUUID: string;
    calendarUUID: string;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export type genericFileDataSchema = string;
export interface fingerprintLoginAccessSchema {
    uuid: string;
    personCode: string;
    loginAccess: boolean;
    isDeleted?: boolean;
    deletedTime?: Date;
}
export interface personPhotoSchema {
    uuid: string;
    personCode: string;
    type: string;
}
export interface authenticationLogSchema {
    uuid: string;
    fpUuid?: string;
    eventDate: Date;
    personID: string;
    machineID: string;
}
export interface authenticationLogExtensionSchema {
    uuid: string;
    primaryVerified: boolean;
    secondaryVerified: boolean;
}
export interface authenticationLogByPaymentCollectionSchema {
    uuid: string;
    witness: string;
    amount: string;
}
export type authenticationLog = authenticationLogSchema & authenticationLogByPaymentCollectionSchema & authenticationLogExtensionSchema;
export interface FileSchema {
    uuid: string;
    fileName: string;
    fileType: string;
    entityName: string;
    fileData: authenticationLogSchema | authenticationLogByPaymentCollectionSchema | personPhotoSchema | fingerprintLoginAccessSchema | genericFileDataSchema | fpTemplateSchema | eventMessageSchema | locationTagSchema | locationRelationSchema | deviceTagSchema | personProfileSchema | iCalendar | iEvent | EventInCalendarInformation;
}
