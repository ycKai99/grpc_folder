export interface OrganisationProfileListing {
    DataService?: DWDataService;
}
export interface DWDataService {
    prof_id?: number;
    class_shortname?: string;
    orgn_address1?: string;
    orgn_address2?: string;
    orgn_address3?: string;
    orgn_faxno?: string;
    orgn_postcode?: string;
    orgn_phone?: string;
    orgn_contact_person?: string;
    orgn_mailing_add_id?: number;
    orgn_type?: string;
    orgn_comp_name?: string;
    orgn_comp_reg_no?: string;
    orgn_comp_reg_add?: string;
    currency_code?: string;
    class_desc?: string;
    class_code?: string;
}
