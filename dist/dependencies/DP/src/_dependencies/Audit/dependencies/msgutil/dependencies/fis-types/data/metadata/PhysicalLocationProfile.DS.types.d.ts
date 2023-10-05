export interface LocationListing {
    Location?: DWLocation;
}
export interface DWLocation {
    loc_id?: number;
    loc_address1?: string;
    loc_address2?: string;
    loc_address3?: string;
    loc_desc?: string;
    loc_type?: string;
    loc_code?: string;
}
