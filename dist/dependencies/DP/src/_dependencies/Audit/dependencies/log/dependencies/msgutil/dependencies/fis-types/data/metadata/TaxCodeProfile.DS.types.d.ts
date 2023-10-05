export interface TaxCodeProfile {
    TaxCodeProfile?: DWTaxCodeProfile;
}
export interface DWTaxCodeProfile {
    taxcodeid?: number;
    taxtype?: string;
    taxcodetypeid?: number;
    taxcode?: string;
    taxrate?: number;
    taxcodetypecode?: string;
    taxcodetypedesc?: string;
    taxdesc?: string;
    taxisclaimable?: number;
    taxispayable?: number;
}
