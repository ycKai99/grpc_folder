export interface ProductListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    prd_id?: number;
    prd_ref_id?: number;
    prd_type?: string;
    loc_id?: number;
    orgn_id?: number;
    prof_id?: number;
    prd_code_alias?: string;
    prd_qty?: number;
    prd_unit_cost?: number;
    prd_date_pur?: string;
    prd_model_no?: string;
    prd_man_id?: number;
    prd_dist_class_id?: number;
    prd_is_primary?: string;
    product_ref_prd_ref_id?: number;
    prd_ref_type?: string;
    prd_ref_unit_cost?: number;
    prd_ref_list_price?: number;
    prd_ref_prof_id?: number;
    prd_ref_prd_dist_class_id?: number;
    prd_ref_prd_assign_serial_no?: string;
    orgn_profile_orgn_short_name?: string;
    prd_code?: string;
    c_1?: number;
    prd_assign_serial_no?: string;
    prd_ref_code?: string;
    orgn_full_name?: string;
    orgn_code?: string;
    loc_code?: string;
    loc_desc?: string;
    prd_ref_desc?: string;
    prd_list_price?: number;
    prd_ref_uom?: string;
    prd_status_code?: string;
    prd_brand_code?: string;
    prd_origin_country_code?: string;
    bin_code?: string;
    prd_desc?: string;
}
