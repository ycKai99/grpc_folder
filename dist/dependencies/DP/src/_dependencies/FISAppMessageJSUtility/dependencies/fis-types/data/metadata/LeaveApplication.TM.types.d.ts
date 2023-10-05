export interface LeaveApplication {
    namepost?: DWnamepost;
    header?: DWheader;
    security?: DWsecurity;
    listing?: DWlisting;
    footer?: DWfooter;
    eventemitter?: DWeventemitter;
}
export interface DWnamepost {
    pers_id?: number;
    ps_employee_acct_id?: number;
    emp_role_id?: number;
    ps_post_desc?: string;
    pers_name?: string;
    ps_emp_role_emp_role_orgn_id?: number;
    ps_employee_emp_number?: string;
    emp_post_frq_process?: number;
    ps_emp_role_acct_id?: number;
}
export interface DWheader {
    ps_doc_id?: number;
    ps_doc_type_id?: number;
    ps_doc_orgn_id?: number;
    ps_doc_leave_ps_doc_id?: number;
    ps_doc_leave_emp_role_id?: number;
    ps_leave_mas_id?: number;
    ps_doc_leave_ps_post_payroll?: string;
    ps_doc_ref_no?: string;
    ps_doc_header_ps_doc_status?: string;
    cleavecertno?: string;
    isnew?: number;
    ps_doc_leave_ps_dt_applied?: string;
    ps_doc_header_ps_doc_remarks?: string;
    ps_dt_from?: string;
    ps_dt_to?: string;
    ps_doc_leave_ps_days?: number;
    ps_doc_leave_ps_post_period?: number;
    ps_doc_leave_ps_leave_amount?: number;
}
export interface DWsecurity {
    doc_preparedby?: string;
    doc_approvedby?: string;
    doc_postedby?: string;
    doc_rejectedby?: string;
    doc_cancelledby?: string;
    doc_dt_prepared?: string;
    doc_dt_approved?: string;
    doc_dt_posted?: string;
    doc_dt_rejected?: string;
    doc_dt_cancelled?: string;
    doc_id?: number;
}
export interface DWlisting {
    ps_doc_id?: number;
    ps_doc_leave_emp_role_id?: number;
    emp_lv_mas_open?: string;
    ps_doc_leave_ps_leave_mas_id?: number;
    emp_lv_mas_year?: number;
    ps_emp_leave_master_ps_leave_id?: number;
    ps_doc_header_ps_doc_ref_no?: string;
    ps_leave_profile_ps_leave_desc?: string;
    ps_doc_header_ps_doc_status?: string;
    ps_doc_leave_ps_dt_applied?: string;
    ps_doc_leave_ps_dt_from?: string;
    ps_doc_leave_ps_dt_to?: string;
    ps_doc_leave_ps_days?: number;
}
export interface DWfooter {
    emp_lv_pro_rate?: string;
    emp_lv_mas_max_time?: number;
    ps_leave_desc?: string;
    emp_lv_mas_year?: number;
    ctimes_taken?: number;
    emp_lv_mas_entitled?: number;
    ps_emp_leave_master_emp_lv_mas_earned?: number;
    emp_lv_mas_brou_forw?: number;
    emp_lv_taken?: number;
    balance?: number;
}
export interface DWeventemitter {
    event_id?: number;
    event_description?: string;
    event_date?: string;
    event_action?: string;
    event_spid?: number;
    event_connection?: number;
    event_procid?: number;
    event_source?: string;
}
