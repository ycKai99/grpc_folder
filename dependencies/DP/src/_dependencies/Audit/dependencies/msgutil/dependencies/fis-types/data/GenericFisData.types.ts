import { ServiceData } from '../interface/export';

export type GenericFisData = {
  type: 'Data';
  service: ServiceData;
  data: Record<string, GenericFisAlias>;
};
export type GenericFisAlias = {
  alias: string;
  rows: {
    row: GenericFisRow[];
  };
};
export type GenericFisRow = {
  rowId: string;
  rowNumber: number;
  column: GenericFisRowColumn;
};
export type GenericFisRowColumn = Record<
  string,
  string | number | boolean | null
>;

/*
const testData:GenericFisData = {
    "type": "Data",
    "service": {
      "serviceId": "Purchase Requisition",
      "serviceName": "Purchase Requisition",
      "serviceType": "task",
      "instanceId": "430FD8A114184F97839CB26D8BF468A3",
      "date": "2022-06-01T04:48:30.812Z",
      "title": "Purchase Requisition",
      "version": "4.00.17"
    },
    "data": {
      "header": {
        "alias": "header",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "doc_type_id": 1403,
                "doc_category": "UQ",
                "doc_by_org_code": "ABC",
                "acct_id": 0,
                "doc_post_type": "O",
                "doc_update_type": "M",
                "doc_tot_entry": 1,
                "doc_tot_debit": "0.0000",
                "doc_tot_credit": "3.0000",
                "doc_status": "xd",
                "tran_doc_periodid": 62022,
                "doc_remarks": null,
                "doc_by_org_id": 30,
                "prd_doc_id": 90910,
                "orgn_code": "ABC",
                "orgn_full_name": "COMPANY ABC SDN BHD",
                "prof_id": 89,
                "prd_loc_id_fr": null,
                "prd_loc_id_to": null,
                "loc_code_fr": null,
                "loc_code_to": null,
                "loc_desc_fr": null,
                "loc_desc_to": null,
                "prf_pers_id": 20,
                "acct_no": null,
                "prf_doc_id": 90910,
                "dest_id": null,
                "cl_doc_id": 90910,
                "cl_doc_suspended": "N",
                "cl_terms": 0,
                "cl_tx_type": "",
                "purchase_doc_id": 90910,
                "doc_expected_dt": null,
                "orgn_unit_full_name": "Admin Office",
                "person_name": "MOYE BIRIK",
                "person_code": "04",
                "orgn_unit_code": "6400",
                "dest_desc": null,
                "doc_dt": "2022-06-01T12:48:31.520Z",
                "doc_ref": "ABC/UQ/2022/06/00001",
                "doc_desc": "Created by FisAppJs",
                "doc_post_dt": "2022-06-01T12:48:31.520Z",
                "doc_currency": "MYR",
                "doc_currency_rate": "1.0000",
                "doc_cur_xchg_unit": "1.0000"
              }
            }
          ]
        }
      },
      "contact": {
        "alias": "contact",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "cl_entity_loc_name": "N/A",
                "mail_orgn_id": null,
                "mail_acct_id": null,
                "ship_orgn_id": null,
                "ship_acct_id": null,
                "add_id": null,
                "cl_instruction": "",
                "cl_contact_pers": "Sikin Sentok",
                "cl_mail_addr1": "KM 25, Bau-Lundu Road,",
                "cl_mail_addr2": "P.O.Box 181, Bau",
                "cl_mail_addr3": "Malaysia",
                "cl_ship_contact_pers": "",
                "cl_ship_addr2": "",
                "cl_mail_postcode": "94007",
                "cl_tel": "082-370425/082-375230",
                "cl_fax": "019-8542154",
                "cl_ship_addr1": "",
                "cl_ship_addr3": "",
                "cl_ship_postcode": "",
                "cl_ship_tel": null,
                "cl_ship_fax": null
              }
            }
          ]
        }
      },
      "security": {
        "alias": "security",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "doc_checkedby": "",
                "doc_approvedby": "",
                "doc_dt_approved": null,
                "doc_dt_checked": null,
                "doc_dt_prepared": "2022-06-01T12:48:32.000Z",
                "doc_postedby": "",
                "doc_dt_posted": null,
                "doc_preparedby": "FIS",
                "doc_cancelledby": null,
                "doc_dt_cancelled": null,
                "doc_dt_closed": null,
                "doc_closedby": null,
                "doc_dt_lastupdate": "2022-06-01T12:48:32.000Z",
                "doc_committed": "N",
                "doc_dt_lastprint": null,
                "doc_print_sequence": null,
                "doc_lastupdatedby": "FIS",
                "doc_last_reprinted_by": null,
                "doc_post_sequence": null
              }
            }
          ]
        }
      },
      "details": {
        "alias": "details",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "entry_no_a0": 1,
                "doc_id": 90910,
                "acct_id": 0,
                "entry_ref": null,
                "entry_debit": "0.0000",
                "entry_credit": "3.0000",
                "entry_seq": 1,
                "doc_tx_type_id": null,
                "entry_currency_code": "MYR",
                "entry_currency_rate": "1.0000",
                "entry_cur_debit": "0.0000",
                "entry_cur_xchg_unit": "1.0000",
                "prd_doc_id": 90910,
                "prd_entry_no": 1,
                "prd_id": 2427,
                "prd_serial_no": null,
                "prd_model": null,
                "prd_qty_credit": "0",
                "prd_owner_id_fr": null,
                "prd_owner_id_to": 89,
                "prd_loc_id_fr": null,
                "prd_loc_id_to": 1,
                "prd_bin_id_fr": null,
                "prd_bin_id_to": 1,
                "prd_qtyinlowestunit": "1.0000",
                "prd_package_id": 1276,
                "prd_igp": "0",
                "prd_ref_desc": "BINDING RING 8MM",
                "purchase_doc_id": 90910,
                "purchase_entry_no": 1,
                "entry_orgn_id": null,
                "entry_warranty_prd": null,
                "entry_trans_method": null,
                "prd_assign_serial_no": "N",
                "doc_tx_name": null,
                "orgn_unit_code": null,
                "orgn_unit_name": null,
                "owner_code_fr": null,
                "owner_name_fr": null,
                "owner_code_to": "6400",
                "owner_name_to": "Admin Office",
                "loc_code_fr": null,
                "loc_desc_fr": null,
                "loc_code_to": "DW",
                "loc_desc_to": "DEFAULT WAREHOUSE",
                "bin_code_fr": null,
                "bin_desc_fr": null,
                "bin_code_to": "DEFAULT",
                "bin_desc_to": "DEFAULT",
                "prd_ref_id": 1835,
                "isnewprd": "N",
                "totalcredit": "3.0000",
                "entry_cur_credit": "3.0000",
                "entry_line_no": 1,
                "prd_code": "0.033",
                "entry_desc": "BINDING RING 8MM",
                "prd_qty_debit": "10.0000",
                "prd_uom": "PCS",
                "entry_expected_dt": null,
                "prd_price": "0.3000",
                "entry_remarks": null
              }
            }
          ]
        }
      },
      "currency": {
        "alias": "currency",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "currency_code": "MYR",
                "exchange_unit": "1.0000",
                "exchange_rate": "1.0000",
                "currency_symbol": "RM",
                "currency_name": "Ringgit Malaysia"
              }
            }
          ]
        }
      },
      "prdalias": {
        "alias": "prdalias",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "entry_no": 1,
                "prd_alias_code": null
              }
            }
          ]
        }
      },
      "supplier": {
        "alias": "supplier",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "acct_id": null,
                "orgn_contact_person": "",
                "orgn_address1": "",
                "orgn_address2": "",
                "orgn_address3": "",
                "orgn_phone": "",
                "orgn_postcode": "",
                "orgn_faxno": "",
                "email_address": ""
              }
            }
          ]
        }
      },
      "detailstype": {
        "alias": "detailstype",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id": 90910,
                "entry_no": 1,
                "entrycategory": "U",
                "entrytype": "USER"
              }
            }
          ]
        }
      },
      "eventemitter": {
        "alias": "eventemitter",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "event_id": 930176419,
                "event_description": "{\t\n \"executingprogramprofile\":  {\t\n \"service\": { \t\n \"serviceId\":  \"Purchase Requisition\" ,\t\n \"serviceName\":  \"Purchase Requisition\" ,\t\n \"serviceType\":  \"task\" ,\t\n \"instanceId\":  \"430FD8A114184F97839CB26D8BF468A3\" ,\t\n \"title\":  \"Purchase Requisition\" ,\t\n \"version\":  \"4.00.17\" \t\n } \t\n} ,\t\n \"emittedeventmessage\":  {\t\n \"InstanceID\":  \"430FD8A114184F97839CB26D8BF468A3\" ,\t\n \"EntityTypeID\":  \"Purchase Requisition\" ,\t\n \"EntityTypeName\":  \"Purchase Requisition\" ,\t\n \"ID\":  \"90910\" ,\t\n \"Code\":  \"ABC/UQ/2022/06/00001\" ,\t\n \"Operation\":  \"savetransaction\" \t\n} , \t\n \"doc_id\":  \"90910\"\t\n}",
                "event_date": "2022-06-01T12:48:38.741Z",
                "event_action": "savetransaction",
                "event_spid": 53,
                "event_connection": 1125846,
                "event_procid": 100873531,
                "event_source": "FISGST@SOFTWAREOPTIMAC\\\\SQL2008"
              }
            }
          ]
        }
      },
      "glledgerheader": {
        "alias": "glledgerheader",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id2": 90910,
                "dist_post_userid": null,
                "doc_dist_id": null,
                "doc_dist_id2": null,
                "c_subs_code_fr": "PC",
                "c_tran_type": "UQ",
                "ledgeremptyamt": "no",
                "ledgernocheckemptyamt": "",
                "dist_post_dt": null,
                "dist_post_seq": null,
                "dist_tran_date": null,
                "subs_code": "GL",
                "dist_post_status": "UNPOSTED",
                "dist_tot_no": 2,
                "dist_tot_debit": "0.0000",
                "dist_tot_credit": "3.0000",
                "dist_check_tot_debit": "0.0000",
                "dist_check_tot_credit": "3.0000",
                "cisrownew": "Y"
              }
            }
          ]
        }
      },
      "glledgerdetails": {
        "alias": "glledgerdetails",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "tran_id": null,
                "acct_id": 15786,
                "tran_seq": -1,
                "subs_code_fr": "PC",
                "subs_code_to": "GL",
                "tran_type": "UQ",
                "tran_ide": null,
                "doc_id": 90910,
                "tran_id2": null,
                "doc_dist_id2": null,
                "entry_no": 1,
                "c_new_row": "Y",
                "c_dist_ammend_option": "Y",
                "doc_tx_type_id": null,
                "cf_max_entryno": 2,
                "cf_rowno": 1,
                "cf_grp_rowcount": 2,
                "cf_tot_cr": 3,
                "cf_tot_db": 3,
                "tran_cur_credit": "0",
                "tran_cur_debit": "3.0000",
                "doc_credit": "0",
                "tran_cur_xchg_unit": "1.0000",
                "tran_currency_rate": "1.0000",
                "doc_debit": "3.0000",
                "tran_currency_code": "MYR",
                "tran_allow_override": "Y",
                "acct_name": "Land Office",
                "acct_no": "64000-00-00101",
                "tran_debit": "3.0000",
                "tran_date": "2022-06-01T12:48:31.520Z",
                "tran_credit": "0",
                "tran_desc": "Created by FisAppJs",
                "tran_ref": "ABC/UQ/2022/06/00001",
                "tran_entrytype": "A"
              }
            },
            {
              "rowId": "2",
              "rowNumber": 2,
              "column": {
                "tran_id": null,
                "acct_id": 15786,
                "tran_seq": -2,
                "subs_code_fr": "PC",
                "subs_code_to": "GL",
                "tran_type": "UQ",
                "tran_ide": null,
                "doc_id": 90910,
                "tran_id2": null,
                "doc_dist_id2": null,
                "entry_no": 2,
                "c_new_row": "Y",
                "c_dist_ammend_option": "Y",
                "doc_tx_type_id": null,
                "cf_max_entryno": 2,
                "cf_rowno": 2,
                "cf_grp_rowcount": 2,
                "cf_tot_cr": 3,
                "cf_tot_db": 3,
                "tran_cur_credit": "3.0000",
                "tran_cur_debit": "0",
                "doc_credit": "3.0000",
                "tran_cur_xchg_unit": "1.0000",
                "tran_currency_rate": "1.0000",
                "doc_debit": "0",
                "tran_currency_code": "MYR",
                "tran_allow_override": "Y",
                "acct_name": "Land Office",
                "acct_no": "64000-00-00101",
                "tran_debit": "0",
                "tran_date": "2022-06-01T12:48:31.520Z",
                "tran_credit": "3.0000",
                "tran_desc": "Created by FisAppJs",
                "tran_ref": "ABC/UQ/2022/06/00001",
                "tran_entrytype": "A"
              }
            }
          ]
        }
      },
      "pwledgerheader": {
        "alias": "pwledgerheader",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "doc_id2": 90910,
                "subs_code": "PW",
                "dist_tot_debit": "0.0000",
                "dist_tot_credit": "3.0000",
                "dist_tot_no": 1,
                "dist_post_seq": null,
                "c_subs_code_fr": "PC",
                "c_tran_type": "UQ",
                "doc_dist_id2": null,
                "dist_post_userid": null,
                "prd_dist_qty_debit": null,
                "prd_dist_qty_credit": null,
                "doc_dist_id3": null,
                "dist_tran_date": null,
                "dist_check_tot_debit": "3.0000",
                "dist_check_tot_credit": "0.0000",
                "dist_post_status": "UNPOSTED",
                "doc_dist_id": null,
                "dist_post_dt": null,
                "cisrownew": "Y"
              }
            }
          ]
        }
      },
      "pwledgerdetails": {
        "alias": "pwledgerdetails",
        "rows": {
          "row": [
            {
              "rowId": "1",
              "rowNumber": 1,
              "column": {
                "tran_id": null,
                "acct_id": 47364,
                "tran_seq": -1,
                "subs_code_fr": "PC",
                "subs_code_to": "PW",
                "tran_type": "UQ",
                "tran_ide": null,
                "acct_no": "6400DW2427",
                "doc_id": 90910,
                "acct_name": "BINDING RING 8MM",
                "c_new_row": "Y",
                "c_dist_ammend_option": "Y",
                "doc_tx_type_id": null,
                "ext_tran_status": null,
                "prd_tran_id": null,
                "tran_qty_debit": "10.0000",
                "tran_qty_credit": "0.0000",
                "tran_prd_package_id": 1276,
                "tran_prd_unit_cost": "0.300000",
                "tran_prd_unit_price": "0.300000",
                "tran_prd_org_id_fr": 0,
                "tran_prd_org_id_to": 89,
                "tran_prd_loc_id_fr": 0,
                "tran_prd_loc_id_to": 1,
                "tran_bin_id_fr": null,
                "tran_bin_id_to": 1,
                "tran_prd_qtyinlowestunit": "1.0000",
                "tran_igp": "0.300000",
                "tran_client_acct_id": 0,
                "tran_unit_charges": null,
                "tran_id2": null,
                "doc_dist_id2": null,
                "entry_no": 1,
                "prd_id": 2427,
                "orgn_code_from": null,
                "orgn_name_from": null,
                "cf_max_entryno": 1,
                "cf_rowno": 1,
                "total_gross_sale_foreign": 0,
                "total_prd_cost_amount_foreign": 3,
                "total_doc_credit": 0,
                "total_doc_debit": 3,
                "cf_tot_db": 3,
                "total_prd_cost_amount": 3,
                "cf_tot_cr": 0,
                "total_gross_sale": 0,
                "tran_cur_credit": "0",
                "tran_cur_debit": "3.0000",
                "from_prd_lot_id": null,
                "prd_cost_amount_foreign": "3.0000000000",
                "prd_gross_sales_foreign": 0,
                "prd_package_cost_foreign": "0.3000000000",
                "prd_package_price_foreign": "0.300000",
                "tran_prd_batch_no": null,
                "tran_prd_lot_id": -1,
                "doc_credit": "0",
                "tran_cur_xchg_unit": "1.0000",
                "tran_currency_rate": "1.0000",
                "tran_currency_code": "MYR",
                "doc_debit": "3.0000",
                "tran_model_no": null,
                "prd_ref_desc": "BINDING RING 8MM",
                "prd_cost_amount": "3.0000000000",
                "prd_code": "0.033",
                "prd_package_cost": "0.3000000000",
                "prd_gross_sales": 0,
                "prd_package_price": "0.3000000000",
                "package_qty_out": "0",
                "tran_entrytype": "A",
                "tran_allow_override": "N",
                "tran_credit": "0",
                "tran_prd_uom": "PCS",
                "package_qty_in": "10",
                "tran_serial_no": null,
                "tran_debit": "3.0000",
                "tran_date": "2022-06-01T12:48:31.520Z",
                "tran_desc": "Created by FisAppJs",
                "tran_ref": "ABC/UQ/2022/06/00001",
                "tran_client_acct_no": null,
                "tran_client_acct_name": ""
              }
            }
          ]
        }
      }
    }
  }
*/
