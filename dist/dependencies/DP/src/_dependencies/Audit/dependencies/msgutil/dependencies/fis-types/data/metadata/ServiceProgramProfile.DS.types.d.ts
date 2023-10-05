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
