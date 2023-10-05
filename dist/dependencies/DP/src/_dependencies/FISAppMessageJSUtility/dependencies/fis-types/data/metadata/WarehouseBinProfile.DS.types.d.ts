export interface WarehouseBinsListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    bin_id?: number;
    loc_id?: number;
    loc_code?: string;
    loc_desc?: string;
    loc_type?: string;
    bin_goodsin?: string;
    bin_code?: string;
    bin_desc?: string;
    bin_color?: string;
    compute_1?: string;
}
