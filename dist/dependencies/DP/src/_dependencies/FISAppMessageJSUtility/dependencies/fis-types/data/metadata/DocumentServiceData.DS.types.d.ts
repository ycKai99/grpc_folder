export interface DocumentHeaderListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    subs_code?: string;
    doc_catagory?: string;
    doc_id?: number;
    doc_type_id?: number;
    doc_category?: string;
    doc_by_org_code?: string;
    acct_id?: number;
    doc_post_type?: string;
    doc_update_type?: string;
    doc_ref?: string;
    doc_dt?: string;
    doc_tot_entry?: number;
    doc_tot_debit?: number;
    doc_tot_credit?: number;
    doc_status?: string;
    tran_doc_periodid?: number;
    doc_desc?: string;
    doc_remarks?: string;
    doc_by_org_id?: number;
    doc_currency?: string;
    doc_currency_rate?: number;
    prof_id?: number;
    doc_post_dt?: string;
    doc_pay_terms?: string;
    serviceid?: string;
    prg_id?: number;
    prg_name?: string;
}
