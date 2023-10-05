export interface LocationListing {
    Warehouse?: DWWarehouse;
}
export interface DWWarehouse {
    loc_id?: number;
    loc_address1?: string;
    loc_address2?: string;
    loc_address3?: string;
    loc_desc?: string;
    loc_type?: string;
    loc_code?: string;
}
