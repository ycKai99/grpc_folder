export interface PersonProfileListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    pers_id?: number;
    pers_dob?: string;
    pers_profile_pers_old_ic?: string;
    pers_remark?: string;
    pers_remark2?: string;
    ext_pers_id?: number;
    pers_alias?: string;
    pers_birthcert?: string;
    pers_pob?: string;
    pers_race?: string;
    pers_religion?: string;
    pers_marital?: string;
    pers_nationality?: string;
    pers_homeadd?: string;
    pers_homeadd2?: string;
    pers_homeadd3?: string;
    pers_telno?: string;
    pers_postadd?: string;
    pers_postadd2?: string;
    pers_postadd3?: string;
    pers_postcode?: string;
    orgn_code?: string;
    orgn_full_name?: string;
    orgn_id?: number;
    pers_email?: string;
    pers_disabled?: string;
    emp_id?: number;
    pers_name?: string;
    pers_code?: string;
    emp_number?: string;
    pers_sex?: string;
    pers_new_ic?: string;
}
