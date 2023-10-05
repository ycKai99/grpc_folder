export interface ProductPackageListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    prd_id?: number;
    prd_package_id?: number;
    prd_package_islowest?: string;
    prd_unit_cost?: number;
    prd_list_price?: number;
    prd_code?: string;
    isdefault?: string;
    isactive?: string;
    prd_remarks?: string;
    prd_package_name?: string;
    prd_package_qty?: number;
    prd_ref_uom?: string;
    ref_table_name?: string;
}
