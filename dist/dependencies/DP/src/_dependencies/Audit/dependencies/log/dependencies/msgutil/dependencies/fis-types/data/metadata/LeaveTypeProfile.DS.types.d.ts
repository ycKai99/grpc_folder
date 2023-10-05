export interface EmployeeLeaveTypeListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    ps_emp_leave_master_emp_lv_mas_brou_forw?: number;
    emp_lv_mas_year?: number;
    ps_emp_leave_master_emp_lv_mas_entitled?: number;
    emp_role_id?: number;
    emp_leave_mas_id?: number;
    compute_1?: string;
    compute_2?: string;
    ps_leave_profile_ps_leave_desc?: string;
    emp_lv_pro_rate?: string;
}
