export interface SocialNetworkAccountRelationListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    socialnetworkid?: number;
    socialnetworkaccountname?: string;
    status?: number;
    effectivedate?: string;
    terminateddate?: string;
    userid?: number;
    user_code?: string;
    user_name?: string;
    user_email?: string;
    socialnetworkname?: string;
    socialnetworkaccountno?: string;
}
