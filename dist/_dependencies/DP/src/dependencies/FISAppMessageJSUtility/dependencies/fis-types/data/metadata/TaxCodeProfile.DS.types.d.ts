/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
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
