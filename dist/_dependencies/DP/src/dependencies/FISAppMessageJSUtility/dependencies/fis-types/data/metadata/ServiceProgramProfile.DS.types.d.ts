/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
export interface ServiceSecurityAccessListing {
    ServiceProgramProfileData?: DWServiceProgramProfileData;
}
export interface DWServiceProgramProfileData {
    fisappserviceid?: number;
    servicetypeid?: number;
    servicetypedesc?: string;
    prg_startup_prg?: string;
    servicetypecode?: string;
    servicename?: string;
    serviceid?: string;
    serviceprogram?: string;
}
