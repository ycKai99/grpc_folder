export interface AccountProfileListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    acct_id?: number;
    orgn_id?: number;
    acct_dt_created?: string;
    acct_status?: number;
    acct_type?: string;
    acct_catag_id?: number;
    acct_credit_balance?: number;
    acct_debit_balance?: number;
    ledger_type_code?: string;
    prof_id?: number;
    acct_balance_method?: string;
    acct_classification?: number;
    acct_email_addr?: string;
    acct_dist_classification?: number;
    currency_code?: string;
    dispute_amt?: number;
    acct_full_name?: string;
    acct_no?: string;
    acct_nature?: string;
    acct_name?: string;
}
