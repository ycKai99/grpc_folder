export interface StockProfile {
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
    prd_man_id?: number;
    prd_dist_class_id?: number;
    prd_is_primary?: string;
    prd_desc?: string;
    prd_costing_method?: string;
    stock_prd_total_igp?: number;
    stock_prd_open_item?: string;
    stock_prd_reorder_level?: number;
    loc_code?: string;
    loc_desc?: string;
    prd_ref_uom?: string;
    prd_assign_serial_no?: string;
    prd_list_price?: number;
    prd_status_code?: string;
    prd_brand_code?: string;
    prd_origin_country_code?: string;
    bin_code?: string;
    orgn_code?: string;
    orgn_short_name?: string;
    prd_ref_desc?: string;
    prd_ref_code?: string;
    prd_code?: string;
    rownumber?: number;
    prd_model_no?: string;
}
