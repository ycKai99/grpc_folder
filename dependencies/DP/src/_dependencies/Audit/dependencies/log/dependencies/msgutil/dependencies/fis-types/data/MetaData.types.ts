export type MetaData = {
  type: 'Metadata';
  service: ServiceData;
  data: Record<string, AliasColumnMetaData>;
};
export type ServiceData = {
  serviceId: string;
  serviceName: string;
  serviceType: string;
  instanceId: string;
  date: string;
  title: string;
  version: string;
};

export type AliasColumnMetaData = {
  alias: string;
  column: Record<string, ColumnMetaData>;
};
export type ColumnMetaData = {
  name: string;
  isKey: boolean;
  dataType: string;
  length: number;
  scale: number;
  caption: string;
  isCompute: boolean;
  tag: string;
};

/*
const testData:MetaData = {
    "type": "Metadata",
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
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_type_id": {
            "name": "doc_type_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_category": {
            "name": "doc_category",
            "isKey": false,
            "dataType": "char",
            "length": 2,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_by_org_code": {
            "name": "doc_by_org_code",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "acct_id": {
            "name": "acct_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_post_type": {
            "name": "doc_post_type",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_update_type": {
            "name": "doc_update_type",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_tot_entry": {
            "name": "doc_tot_entry",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_tot_debit": {
            "name": "doc_tot_debit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_tot_credit": {
            "name": "doc_tot_credit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_status": {
            "name": "doc_status",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "tran_doc_periodid": {
            "name": "tran_doc_periodid",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_remarks": {
            "name": "doc_remarks",
            "isKey": false,
            "dataType": "char",
            "length": 240,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_by_org_id": {
            "name": "doc_by_org_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_doc_id": {
            "name": "prd_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_code": {
            "name": "orgn_code",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_full_name": {
            "name": "orgn_full_name",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prof_id": {
            "name": "prof_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_loc_id_fr": {
            "name": "prd_loc_id_fr",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_loc_id_to": {
            "name": "prd_loc_id_to",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_code_fr": {
            "name": "loc_code_fr",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_code_to": {
            "name": "loc_code_to",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_desc_fr": {
            "name": "loc_desc_fr",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_desc_to": {
            "name": "loc_desc_to",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prf_pers_id": {
            "name": "prf_pers_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "acct_no": {
            "name": "acct_no",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Orgn Unit",
            "isCompute": false,
            "tag": ""
          },
          "prf_doc_id": {
            "name": "prf_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "dest_id": {
            "name": "dest_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_doc_id": {
            "name": "cl_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_doc_suspended": {
            "name": "cl_doc_suspended",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_terms": {
            "name": "cl_terms",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_tx_type": {
            "name": "cl_tx_type",
            "isKey": false,
            "dataType": "char",
            "length": 2,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "purchase_doc_id": {
            "name": "purchase_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_expected_dt": {
            "name": "doc_expected_dt",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_unit_full_name": {
            "name": "orgn_unit_full_name",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Organisation Unit Full Name",
            "isCompute": false,
            "tag": "{label:\"Organisation Unit Full Name\"}"
          },
          "person_name": {
            "name": "person_name",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "Request By Name",
            "isCompute": false,
            "tag": "{label:\"Request By Name\"}"
          },
          "person_code": {
            "name": "person_code",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "Request By Code",
            "isCompute": false,
            "tag": "{label:\"Request By Code\"}"
          },
          "orgn_unit_code": {
            "name": "orgn_unit_code",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "Organisation Unit Code",
            "isCompute": false,
            "tag": "{label:\"Organisation Unit Code\"}"
          },
          "dest_desc": {
            "name": "dest_desc",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_dt": {
            "name": "doc_dt",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Document Date",
            "isCompute": false,
            "tag": "{label:\"Document Date\"}"
          },
          "doc_ref": {
            "name": "doc_ref",
            "isKey": false,
            "dataType": "char",
            "length": 40,
            "scale": 0,
            "caption": "Document No",
            "isCompute": false,
            "tag": "{label:\"Document No\"}"
          },
          "doc_desc": {
            "name": "doc_desc",
            "isKey": false,
            "dataType": "char",
            "length": 80,
            "scale": 0,
            "caption": "Description",
            "isCompute": false,
            "tag": "{label:\"Description\"}"
          },
          "doc_post_dt": {
            "name": "doc_post_dt",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Period Post Date",
            "isCompute": false,
            "tag": ""
          },
          "doc_currency": {
            "name": "doc_currency",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "Currency",
            "isCompute": false,
            "tag": "{label:\"Currency\"}"
          },
          "doc_currency_rate": {
            "name": "doc_currency_rate",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Rate",
            "isCompute": false,
            "tag": "{label:\"Rate\"}"
          },
          "doc_cur_xchg_unit": {
            "name": "doc_cur_xchg_unit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Currency Exchange Unit",
            "isCompute": false,
            "tag": "{label:\"Currency Exchange Unit\"}"
          }
        }
      },
      "contact": {
        "alias": "contact",
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_entity_loc_name": {
            "name": "cl_entity_loc_name",
            "isKey": true,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "mail_orgn_id": {
            "name": "mail_orgn_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "mail_acct_id": {
            "name": "mail_acct_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "ship_orgn_id": {
            "name": "ship_orgn_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "ship_acct_id": {
            "name": "ship_acct_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "add_id": {
            "name": "add_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "cl_instruction": {
            "name": "cl_instruction",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Instruction",
            "isCompute": false,
            "tag": "{label:\"Instruction\"}"
          },
          "cl_contact_pers": {
            "name": "cl_contact_pers",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Billing Person",
            "isCompute": false,
            "tag": "{label:\"Billing Person\"}"
          },
          "cl_mail_addr1": {
            "name": "cl_mail_addr1",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Billing Address 1",
            "isCompute": false,
            "tag": "{label:\"Billing Address 1\"}"
          },
          "cl_mail_addr2": {
            "name": "cl_mail_addr2",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Billing Address 2",
            "isCompute": false,
            "tag": "{label:\"Billing Address 2\"}"
          },
          "cl_mail_addr3": {
            "name": "cl_mail_addr3",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Billing Address 3",
            "isCompute": false,
            "tag": "{label:\"Billing Address 3\"}"
          },
          "cl_ship_contact_pers": {
            "name": "cl_ship_contact_pers",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Shipping Person",
            "isCompute": false,
            "tag": "{label:\"Shipping Person\"}"
          },
          "cl_ship_addr2": {
            "name": "cl_ship_addr2",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Shipping Address 2",
            "isCompute": false,
            "tag": "{label:\"Shipping Address 2\"}"
          },
          "cl_mail_postcode": {
            "name": "cl_mail_postcode",
            "isKey": false,
            "dataType": "char",
            "length": 8,
            "scale": 0,
            "caption": "Billing Postcode",
            "isCompute": false,
            "tag": "{label:\"Billing Postcode\"}"
          },
          "cl_tel": {
            "name": "cl_tel",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Billing Telephone",
            "isCompute": false,
            "tag": "{label:\"Billing Telephone\"}"
          },
          "cl_fax": {
            "name": "cl_fax",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Billing Fax",
            "isCompute": false,
            "tag": "{label:\"Billing Fax\"}"
          },
          "cl_ship_addr1": {
            "name": "cl_ship_addr1",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Shipping Address 1",
            "isCompute": false,
            "tag": "{label:\"Shipping Address 1\"}"
          },
          "cl_ship_addr3": {
            "name": "cl_ship_addr3",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Shipping Address 3",
            "isCompute": false,
            "tag": "{label:\"Shipping Address 3\"}"
          },
          "cl_ship_postcode": {
            "name": "cl_ship_postcode",
            "isKey": false,
            "dataType": "char",
            "length": 8,
            "scale": 0,
            "caption": "Shipping Postcode",
            "isCompute": false,
            "tag": "{label:\"Shipping Postcode\"}"
          },
          "cl_ship_tel": {
            "name": "cl_ship_tel",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Billing Telephone",
            "isCompute": false,
            "tag": "{label:\"Billing Telephone\"}"
          },
          "cl_ship_fax": {
            "name": "cl_ship_fax",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Billing Fax",
            "isCompute": false,
            "tag": "{label:\"Billing Fax\"}"
          }
        }
      },
      "security": {
        "alias": "security",
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_checkedby": {
            "name": "doc_checkedby",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "Verified by",
            "isCompute": false,
            "tag": "{label:\"Verified by\"}"
          },
          "doc_approvedby": {
            "name": "doc_approvedby",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "Approved by",
            "isCompute": false,
            "tag": "{label:\"Approved by\"}"
          },
          "doc_dt_approved": {
            "name": "doc_dt_approved",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Approved",
            "isCompute": false,
            "tag": "{label:\"Date Approved\"}"
          },
          "doc_dt_checked": {
            "name": "doc_dt_checked",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Verified",
            "isCompute": false,
            "tag": "{label:\"Date Verified\"}"
          },
          "doc_dt_prepared": {
            "name": "doc_dt_prepared",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Prepared",
            "isCompute": false,
            "tag": "{label:\"Date Prepared\"}"
          },
          "doc_postedby": {
            "name": "doc_postedby",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "Posted by",
            "isCompute": false,
            "tag": "{label:\"Posted by\"}"
          },
          "doc_dt_posted": {
            "name": "doc_dt_posted",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Posted",
            "isCompute": false,
            "tag": "{label:\"Date Posted\"}"
          },
          "doc_preparedby": {
            "name": "doc_preparedby",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "Prepared by",
            "isCompute": false,
            "tag": "{label:\"Prepared by\"}"
          },
          "doc_cancelledby": {
            "name": "doc_cancelledby",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Cancelled by",
            "isCompute": false,
            "tag": "{label:\"Cancelled by\"}"
          },
          "doc_dt_cancelled": {
            "name": "doc_dt_cancelled",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Cancelled",
            "isCompute": false,
            "tag": "{label:\"Date Cancelled\"}"
          },
          "doc_dt_closed": {
            "name": "doc_dt_closed",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Date Closed",
            "isCompute": false,
            "tag": "{label:\"Date Closed\"}"
          },
          "doc_closedby": {
            "name": "doc_closedby",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Closed by",
            "isCompute": false,
            "tag": "{label:\"Closed by\"}"
          },
          "doc_dt_lastupdate": {
            "name": "doc_dt_lastupdate",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Last Updated",
            "isCompute": false,
            "tag": "{label:\"Last Updated\"}"
          },
          "doc_committed": {
            "name": "doc_committed",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "Committed",
            "isCompute": false,
            "tag": "{label:\"Committed\"}"
          },
          "doc_dt_lastprint": {
            "name": "doc_dt_lastprint",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Last Printed",
            "isCompute": false,
            "tag": "{label:\"Last Printed\"}"
          },
          "doc_print_sequence": {
            "name": "doc_print_sequence",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Printed Count",
            "isCompute": false,
            "tag": "{label:\"Printed Count\"}"
          },
          "doc_lastupdatedby": {
            "name": "doc_lastupdatedby",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "Last Updated by",
            "isCompute": false,
            "tag": "{label:\"Last Updated by\"}"
          },
          "doc_last_reprinted_by": {
            "name": "doc_last_reprinted_by",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Last Reprinted by",
            "isCompute": false,
            "tag": "{label:\"Last Reprinted by\"}"
          },
          "doc_post_sequence": {
            "name": "doc_post_sequence",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Posted Count",
            "isCompute": false,
            "tag": "{label:\"Posted Count\"}"
          }
        }
      },
      "details": {
        "alias": "details",
        "column": {
          "entry_no_a0": {
            "name": "entry_no_a0",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "No",
            "isCompute": false,
            "tag": ""
          },
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "acct_id": {
            "name": "acct_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_ref": {
            "name": "entry_ref",
            "isKey": false,
            "dataType": "char",
            "length": 40,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_debit": {
            "name": "entry_debit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_credit": {
            "name": "entry_credit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_seq": {
            "name": "entry_seq",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_tx_type_id": {
            "name": "doc_tx_type_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_currency_code": {
            "name": "entry_currency_code",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_currency_rate": {
            "name": "entry_currency_rate",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_cur_debit": {
            "name": "entry_cur_debit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_cur_xchg_unit": {
            "name": "entry_cur_xchg_unit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_doc_id": {
            "name": "prd_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_entry_no": {
            "name": "prd_entry_no",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_id": {
            "name": "prd_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_serial_no": {
            "name": "prd_serial_no",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_model": {
            "name": "prd_model",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_qty_credit": {
            "name": "prd_qty_credit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_owner_id_fr": {
            "name": "prd_owner_id_fr",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_owner_id_to": {
            "name": "prd_owner_id_to",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_loc_id_fr": {
            "name": "prd_loc_id_fr",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_loc_id_to": {
            "name": "prd_loc_id_to",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_bin_id_fr": {
            "name": "prd_bin_id_fr",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_bin_id_to": {
            "name": "prd_bin_id_to",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_qtyinlowestunit": {
            "name": "prd_qtyinlowestunit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_package_id": {
            "name": "prd_package_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_igp": {
            "name": "prd_igp",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_ref_desc": {
            "name": "prd_ref_desc",
            "isKey": false,
            "dataType": "char",
            "length": 80,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "purchase_doc_id": {
            "name": "purchase_doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "purchase_entry_no": {
            "name": "purchase_entry_no",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_orgn_id": {
            "name": "entry_orgn_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_warranty_prd": {
            "name": "entry_warranty_prd",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "entry_trans_method": {
            "name": "entry_trans_method",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_assign_serial_no": {
            "name": "prd_assign_serial_no",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "doc_tx_name": {
            "name": "doc_tx_name",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_unit_code": {
            "name": "orgn_unit_code",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_unit_name": {
            "name": "orgn_unit_name",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "owner_code_fr": {
            "name": "owner_code_fr",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "owner_name_fr": {
            "name": "owner_name_fr",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "owner_code_to": {
            "name": "owner_code_to",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "owner_name_to": {
            "name": "owner_name_to",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_code_fr": {
            "name": "loc_code_fr",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_desc_fr": {
            "name": "loc_desc_fr",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_code_to": {
            "name": "loc_code_to",
            "isKey": false,
            "dataType": "char",
            "length": 5,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "loc_desc_to": {
            "name": "loc_desc_to",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "bin_code_fr": {
            "name": "bin_code_fr",
            "isKey": false,
            "dataType": "char",
            "length": 18,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "bin_desc_fr": {
            "name": "bin_desc_fr",
            "isKey": false,
            "dataType": "char",
            "length": 80,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "bin_code_to": {
            "name": "bin_code_to",
            "isKey": false,
            "dataType": "char",
            "length": 18,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "bin_desc_to": {
            "name": "bin_desc_to",
            "isKey": false,
            "dataType": "char",
            "length": 80,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "prd_ref_id": {
            "name": "prd_ref_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "isnewprd": {
            "name": "isnewprd",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "totalcredit": {
            "name": "totalcredit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 0,
            "caption": "Total Amount",
            "isCompute": true,
            "tag": "{label:\"Total Amount\"}"
          },
          "entry_cur_credit": {
            "name": "entry_cur_credit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Amount",
            "isCompute": false,
            "tag": "{label:\"Amount\"}"
          },
          "entry_line_no": {
            "name": "entry_line_no",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "No",
            "isCompute": false,
            "tag": "{label:\"No\"}"
          },
          "prd_code": {
            "name": "prd_code",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Item Code",
            "isCompute": false,
            "tag": "{label:\"Item Code\"}"
          },
          "entry_desc": {
            "name": "entry_desc",
            "isKey": false,
            "dataType": "char",
            "length": 80,
            "scale": 0,
            "caption": "Particulars",
            "isCompute": false,
            "tag": "{label:\"Particulars\"}"
          },
          "prd_qty_debit": {
            "name": "prd_qty_debit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Quantity",
            "isCompute": false,
            "tag": "{label:\"Quantity\"}"
          },
          "prd_uom": {
            "name": "prd_uom",
            "isKey": false,
            "dataType": "char",
            "length": 20,
            "scale": 0,
            "caption": "UOM",
            "isCompute": false,
            "tag": "{label:\"UOM\"}"
          },
          "entry_expected_dt": {
            "name": "entry_expected_dt",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Expected Receipt Date",
            "isCompute": false,
            "tag": "{label:\"Expected Receipt Date\"}"
          },
          "prd_price": {
            "name": "prd_price",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Unit Price",
            "isCompute": false,
            "tag": "{label:\"Unit Price\"}"
          },
          "entry_remarks": {
            "name": "entry_remarks",
            "isKey": false,
            "dataType": "char",
            "length": 240,
            "scale": 0,
            "caption": "Remark",
            "isCompute": false,
            "tag": "{label:\"Remark\"}"
          }
        }
      },
      "currency": {
        "alias": "currency",
        "column": {
          "currency_code": {
            "name": "currency_code",
            "isKey": false,
            "dataType": "char",
            "length": 10,
            "scale": 0,
            "caption": "Currency Code",
            "isCompute": false,
            "tag": "{label:\"Currency Code\"}"
          },
          "exchange_unit": {
            "name": "exchange_unit",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Exchange Unit",
            "isCompute": false,
            "tag": "{label:\"Exchange Unit\"}"
          },
          "exchange_rate": {
            "name": "exchange_rate",
            "isKey": false,
            "dataType": "decimal",
            "length": 0,
            "scale": 4,
            "caption": "Exchange Rate",
            "isCompute": false,
            "tag": "{label:\"Exchange Rate\"}"
          },
          "currency_symbol": {
            "name": "currency_symbol",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Currency Symbol",
            "isCompute": false,
            "tag": "{label:\"Currency Symbol\"}"
          },
          "currency_name": {
            "name": "currency_name",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Currency Name",
            "isCompute": false,
            "tag": "{label:\"Currency Name\"}"
          }
        }
      },
      "prdalias": {
        "alias": "prdalias",
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Doc Id",
            "isCompute": false,
            "tag": "{label:\"Doc Id\"}"
          },
          "entry_no": {
            "name": "entry_no",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Entry No",
            "isCompute": false,
            "tag": "{label:\"Entry No\"}"
          },
          "prd_alias_code": {
            "name": "prd_alias_code",
            "isKey": false,
            "dataType": "char",
            "length": 255,
            "scale": 0,
            "caption": "Prd Alias Code",
            "isCompute": false,
            "tag": "{label:\"Prd Alias Code\"}"
          }
        }
      },
      "supplier": {
        "alias": "supplier",
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "acct_id": {
            "name": "acct_id",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "",
            "isCompute": false,
            "tag": ""
          },
          "orgn_contact_person": {
            "name": "orgn_contact_person",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Person",
            "isCompute": false,
            "tag": "{label:\"Person\"}"
          },
          "orgn_address1": {
            "name": "orgn_address1",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Address 1",
            "isCompute": false,
            "tag": "{label:\"Address 1\"}"
          },
          "orgn_address2": {
            "name": "orgn_address2",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Address 2",
            "isCompute": false,
            "tag": "{label:\"Address 2\"}"
          },
          "orgn_address3": {
            "name": "orgn_address3",
            "isKey": false,
            "dataType": "char",
            "length": 50,
            "scale": 0,
            "caption": "Address 3",
            "isCompute": false,
            "tag": "{label:\"Address 3\"}"
          },
          "orgn_phone": {
            "name": "orgn_phone",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Telephone",
            "isCompute": false,
            "tag": "{label:\"Telephone\"}"
          },
          "orgn_postcode": {
            "name": "orgn_postcode",
            "isKey": false,
            "dataType": "char",
            "length": 8,
            "scale": 0,
            "caption": "Postcode",
            "isCompute": false,
            "tag": "{label:\"Postcode\"}"
          },
          "orgn_faxno": {
            "name": "orgn_faxno",
            "isKey": false,
            "dataType": "char",
            "length": 25,
            "scale": 0,
            "caption": "Fax",
            "isCompute": false,
            "tag": "{label:\"Fax\"}"
          },
          "email_address": {
            "name": "email_address",
            "isKey": false,
            "dataType": "char",
            "length": 255,
            "scale": 0,
            "caption": "Email Address",
            "isCompute": false,
            "tag": "{label:\"Email Address\"}"
          }
        }
      },
      "detailstype": {
        "alias": "detailstype",
        "column": {
          "doc_id": {
            "name": "doc_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Doc Id",
            "isCompute": false,
            "tag": "{label:\"Doc Id\"}"
          },
          "entry_no": {
            "name": "entry_no",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Entry No",
            "isCompute": false,
            "tag": "{label:\"Entry No\"}"
          },
          "entrycategory": {
            "name": "entrycategory",
            "isKey": false,
            "dataType": "char",
            "length": 1,
            "scale": 0,
            "caption": "Entry Category",
            "isCompute": false,
            "tag": "{label:\"Entry Category\"}"
          },
          "entrytype": {
            "name": "entrytype",
            "isKey": false,
            "dataType": "char",
            "length": 40,
            "scale": 0,
            "caption": "Entry Type",
            "isCompute": false,
            "tag": "{label:\"Entry Type\"}"
          }
        }
      },
      "eventemitter": {
        "alias": "eventemitter",
        "column": {
          "event_id": {
            "name": "event_id",
            "isKey": true,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Event ID\"}",
            "isCompute": false,
            "tag": "{label:\"Event ID\"} "
          },
          "event_description": {
            "name": "event_description",
            "isKey": false,
            "dataType": "char",
            "length": 255,
            "scale": 0,
            "caption": "Event Description\"}",
            "isCompute": false,
            "tag": "{label:\"Event Description\"} "
          },
          "event_date": {
            "name": "event_date",
            "isKey": false,
            "dataType": "datetime",
            "length": 0,
            "scale": 0,
            "caption": "Event Date\"}",
            "isCompute": false,
            "tag": "{label:\"Event Date\"} "
          },
          "event_action": {
            "name": "event_action",
            "isKey": false,
            "dataType": "char",
            "length": 30,
            "scale": 0,
            "caption": "Event Action\"}",
            "isCompute": false,
            "tag": "{label:\"Event Action\"} "
          },
          "event_spid": {
            "name": "event_spid",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Event SP ID\"}",
            "isCompute": false,
            "tag": "{label:\"Event SP ID\"} "
          },
          "event_connection": {
            "name": "event_connection",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Event Connection\"}",
            "isCompute": false,
            "tag": "{label:\"Event Connection\"} "
          },
          "event_procid": {
            "name": "event_procid",
            "isKey": false,
            "dataType": "long",
            "length": 0,
            "scale": 0,
            "caption": "Event Proc ID\"}",
            "isCompute": false,
            "tag": "{label:\"Event Proc ID\"} "
          },
          "event_source": {
            "name": "event_source",
            "isKey": false,
            "dataType": "char",
            "length": 100,
            "scale": 0,
            "caption": "Event Source\"}",
            "isCompute": false,
            "tag": "{label:\"Event Source\"} "
          }
        }
      }
    }
  }
  */
