export interface EmployeeProfileListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    emp_role_id?: number;
    pers_id?: number;
    emp_id?: number;
    emp_role_orgn_id?: number;
    ps_post_code?: string;
    orgn_code?: string;
    orgn_full_name?: string;
    pers_sex?: string;
    pers_old_ic?: string;
    pers_new_ic?: string;
    pers_dob?: string;
    pers_telno?: string;
    emp_passportno?: string;
    pers_birthcert?: string;
    pers_pob?: string;
    pers_race?: string;
    pers_religion?: string;
    pers_marital?: string;
    pers_nationality?: string;
    emp_employ_type?: string;
    emp_card_no?: string;
    fw_id?: number;
    acct_id?: number;
    emp_role_datestart?: string;
    emp_role_dateend?: string;
    emp_role_status?: string;
    emp_role_employment_group?: string;
    attendance_hour?: number;
    no_ot_claim?: string;
    emp_post_id?: number;
    emp_post_pay_type?: string;
    emp_number?: string;
    fw_number?: string;
    pers_name?: string;
    ps_post_desc?: string;
}
