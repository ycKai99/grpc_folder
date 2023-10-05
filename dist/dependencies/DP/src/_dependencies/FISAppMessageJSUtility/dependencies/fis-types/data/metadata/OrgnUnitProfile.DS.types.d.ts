export interface OrganisationProfileListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    prof_id?: number;
    class_shortname?: string;
    is_lowest?: string;
    class_desc?: string;
    class_code?: string;
}
