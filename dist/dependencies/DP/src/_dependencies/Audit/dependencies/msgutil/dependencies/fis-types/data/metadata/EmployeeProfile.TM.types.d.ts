export interface EmployeeDetailsEntry {
    header?: DWheader;
    subheader?: DWsubheader;
    empprof?: DWempprof;
    details?: DWdetails;
    subdetails?: DWsubdetails;
    empbank?: DWempbank;
    postdetails?: DWpostdetails;
    postlist?: DWpostlist;
    salarydetails?: DWsalarydetails;
    empins?: DWempins;
    empinslist?: DWempinslist;
    eventemitter?: DWeventemitter;
}
export interface DWheader {
    pers_id1?: number;
    pers_id2?: number;
    pers_birthcert?: string;
    orgn_unit_code?: string;
    orgn_unit_full_name?: string;
    ps_nationality_code_v_name?: string;
    pers_name?: string;
    pers_old_ic?: string;
    pers_new_ic?: string;
    pers_pob?: string;
    pers_religion?: string;
    pers_dob?: string;
    pers_race?: string;
    pers_sex?: string;
    pers_marital?: string;
    pers_alias?: string;
    pers_nationality?: string;
    pers_code?: string;
    pers_telno?: string;
    pers_homeadd?: string;
    pers_homeadd2?: string;
    pers_homeadd3?: string;
    pers_postadd?: string;
    pers_postcode?: string;
    pers_postadd2?: string;
    pers_postadd3?: string;
    pers_remark?: string;
    pers_remark2?: string;
    pers_email?: string;
    pers_disabled?: string;
}
export interface DWsubheader {
    role_pers_id?: number;
    pers_id?: number;
    role_id?: number;
}
export interface DWempprof {
    emp_id?: number;
    pers_id?: number;
    acct_id?: number;
    acct_profile_acct_id?: number;
    acct_profile_orgn_id?: number;
    acct_profile_acct_no?: string;
    acct_profile_acct_dt_created?: string;
    acct_profile_acct_status?: number;
    acct_profile_acct_type?: string;
    acct_profile_acct_catag_id?: number;
    acct_profile_acct_credit_balance?: number;
    acct_profile_acct_debit_balance?: number;
    acct_profile_acct_name?: string;
    acct_profile_acct_nature?: string;
    acct_profile_ledger_type_code?: string;
    acct_profile_prof_id?: number;
    acct_profile_acct_balance_method?: string;
    pers_name?: string;
    emp_bank_account?: string;
    emp_bank?: number;
    emp_id_m?: number;
    emp_med_id?: number;
    med_claim_limit_type?: string;
    acct_profile_acct_full_name?: string;
    emp_photo?: string;
    emp_foreign?: string;
    protected_flag?: number;
    emp_file_ref_no?: string;
    emp_tax_type?: string;
    emp_physical_loc?: string;
    emp_eis_flag?: string;
    emp_socso_no?: string;
    emp_socso_flag?: string;
    emp_socso_scheme?: string;
    emp_initial?: string;
    emp_efp_account?: string;
    emp_epf_flag?: string;
    emp_bumi?: string;
    emp_employ_type?: string;
    emp_number?: string;
    emp_tax_flag?: string;
    emp_handphoneno?: string;
    emp_inc_tax_branch?: string;
    emp_tax_wife_code?: number;
    emp_tax_account?: string;
    emp_number_of_child?: number;
    emp_spouse_disabled?: string;
    emp_spouse_tax_brch?: string;
    emp_spouse_tax_no?: string;
    emp_amanah_saham_no?: string;
    emp_tabung_haji_no?: string;
    emp_baitumal_no?: string;
    emp_pension_con_no?: string;
    emp_union_no?: string;
    emp_passportno?: string;
    med_claim_limit?: number;
}
export interface DWdetails {
    ps_bd_code?: string;
    emp_bd_currency_xchg_unit?: number;
    emp_bd_currency_rate?: number;
    emp_bd_currency_code?: string;
    emp_bd_code?: string;
    pers_id?: number;
    isnew?: number;
    doc_tx_type_id?: number;
    emp_bd_occurance_type?: string;
    emp_bd_id?: number;
    emp_role_id?: number;
    emp_bd_type_id?: number;
    emp_bd_date_from?: string;
    emp_bd_date_to?: string;
    emp_bd_dr_amount?: number;
    emp_bd_cr_amount?: number;
    emp_bd_cal_order?: number;
    emp_bd_desc?: string;
    emp_bd_pro_rate?: string;
    py_prd_code_id?: number;
    emp_bd_bd_amount?: number;
}
export interface DWsubdetails {
    isnew?: number;
    emp_role_id?: number;
    pers_id?: number;
    emp_bd_attract_id?: number;
    emp_bd_id?: number;
    emp_bd_type_id?: number;
    emp_bd_attract_bd_id?: number;
}
export interface DWempbank {
    emp_bank_prof_id?: number;
    pers_id?: number;
    emp_banks_tot_default_amt?: number;
    emp_id?: number;
    c_active_count?: number;
    c_active_flag?: number;
    c_tot_default_amt?: number;
    status?: number;
    emp_bank_status?: string;
    emp_bank_id?: number;
    emp_bank_acc_no?: string;
    emp_bank_default_amt?: number;
}
export interface DWpostdetails {
    emp_role_id?: number;
    emp_role_code?: string;
    emp_roletype_code?: string;
    ps_emp_role_pers_id?: number;
    ps_emp_post_emp_role_id?: number;
    emp_post_grade_id?: number;
    ps_emp_role_acct_id?: number;
    status?: number;
    row_modified?: number;
    emp_id?: number;
    emp_bd_dft_cur_debit?: number;
    emp_post_pay_type?: string;
    emp_post_scale_id?: number;
    compute_1?: string;
    emp_post_pay_mode?: string;
    emp_post_frq_process?: number;
    emp_bd_currency_code?: string;
    emp_post_id?: number;
    emp_role_orgn_id?: number;
    emp_post_is_stmt?: string;
    emp_bd_dr_amount?: number;
    emp_role_datestart?: string;
    emp_role_dateend?: string;
    emp_post_date_confirm?: string;
    emp_role_status?: string;
    emp_post_salary_incr_mth?: string;
    emp_role_desc?: string;
}
export interface DWpostlist {
    ps_employee_emp_number?: string;
    ps_emp_role_emp_role_dateend?: string;
    ps_emp_post_emp_role_id?: number;
    pers_id?: number;
    ps_post_profile_ps_post_desc?: string;
    orgn_profile_orgn_full_name?: string;
    emp_role_id?: number;
    ps_emp_role_emp_role_datestart?: string;
    ps_emp_role_emp_role_status?: string;
}
export interface DWsalarydetails {
    ps_statutory_bd_type_id?: number;
}
export interface DWempins {
    emp_ins_id?: number;
    emp_id?: number;
    ins_insurance_id?: number;
    ins_purchase_doc_id?: number;
    ins_cancel_doc_id?: number;
    ins_policy_prof_id?: number;
    ins_orgn_short_name?: string;
    pers_id?: number;
    ins_provider?: number;
    ins_policy_ref_id?: number;
    ins_amt?: number;
    policy_no?: string;
    ins_can_doc_dt?: string;
    ins_can_doc_ref?: string;
    ins_orgn_code?: string;
    ins_orgn_full_name?: string;
    ins_pur_doc_dt?: string;
    ins_pur_doc_ref?: string;
    dt_premium_end?: string;
    dt_premium_start?: string;
    renewal_policy_no?: string;
    ins_benefit?: string;
    ins_policy_ref_no?: string;
}
export interface DWempinslist {
    emp_ins_id?: number;
    emp_id?: number;
    ins_insurance_id?: number;
    purchase_doc_id?: number;
    ins_cancel_doc_id?: number;
    ins_benefit?: string;
    ins_amt?: number;
    policy_no?: string;
    renewal_policy_no?: string;
    ins_policy_ref_no?: string;
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
