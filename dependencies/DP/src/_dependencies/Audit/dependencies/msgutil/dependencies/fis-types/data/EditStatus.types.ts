import { ServiceData } from '../interface/export';

export type EditStatus = {
  type: 'EditStatus';
  service: ServiceData;
  state: string;
  status: string;
  isEditable: boolean;
  permission: PermissionData;
  data: Record<string, AliasPermission>;
};

export type PermissionData = {
  approve: boolean;
  cancel: boolean;
  check: boolean;
  commit: boolean;
  create: boolean;
  delete: boolean;
  distribute: boolean;
  modify: boolean;
  post: boolean;
  print: boolean;
  reopen: boolean;
  retrieve: boolean;
  reverse: boolean;
  save: boolean;
  unpost: boolean;
  verify: boolean;
  voids: boolean;
};

export type AliasPermission = {
  alias: string;
  isEditable: boolean;
  row: {
    isMultiRow: boolean;
    permission: RowPermissionData;
  };
  column: Record<string, ColumnPermissionData>;
};

export type RowPermissionData = {
  add: boolean;
  delete: boolean;
};

export type ColumnPermissionData = {
  visible: boolean;
  isEditable: boolean;
};

/*
const testData:editStatus = {
    "type": "EditStatus",
    "service": {
      "serviceId": "Purchase Requisition",
      "serviceName": "Purchase Requisition",
      "serviceType": "task",
      "instanceId": "430FD8A114184F97839CB26D8BF468A3",
      "date": "2022-06-01T04:48:30.812Z",
      "title": "Purchase Requisition - View ",
      "version": "4.00.17"
    },
    "state": "View",
    "status": "",
    "isEditable": false,
    "permission": {
      "approve": true,
      "cancel": false,
      "check": false,
      "commit": false,
      "create": true,
      "delete": true,
      "distribute": true,
      "modify": true,
      "post": true,
      "print": false,
      "reopen": false,
      "retrieve": true,
      "reverse": false,
      "save": false,
      "unpost": false,
      "verify": true,
      "voids": false
    },
    "data": {
      "header": {
        "alias": "header",
        "isEditable": false,
        "row": {
          "isMultiRow": false,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": false,
            "isEditable": false
          },
          "doc_type_id": {
            "visible": false,
            "isEditable": false
          },
          "doc_category": {
            "visible": false,
            "isEditable": false
          },
          "doc_by_org_code": {
            "visible": false,
            "isEditable": false
          },
          "acct_id": {
            "visible": false,
            "isEditable": false
          },
          "doc_post_type": {
            "visible": false,
            "isEditable": false
          },
          "doc_update_type": {
            "visible": false,
            "isEditable": false
          },
          "doc_tot_entry": {
            "visible": false,
            "isEditable": false
          },
          "doc_tot_debit": {
            "visible": false,
            "isEditable": false
          },
          "doc_tot_credit": {
            "visible": false,
            "isEditable": false
          },
          "doc_status": {
            "visible": false,
            "isEditable": false
          },
          "tran_doc_periodid": {
            "visible": false,
            "isEditable": false
          },
          "doc_remarks": {
            "visible": false,
            "isEditable": false
          },
          "doc_by_org_id": {
            "visible": false,
            "isEditable": false
          },
          "prd_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "orgn_code": {
            "visible": false,
            "isEditable": false
          },
          "orgn_full_name": {
            "visible": false,
            "isEditable": false
          },
          "prof_id": {
            "visible": false,
            "isEditable": false
          },
          "prd_loc_id_fr": {
            "visible": false,
            "isEditable": false
          },
          "prd_loc_id_to": {
            "visible": false,
            "isEditable": false
          },
          "loc_code_fr": {
            "visible": false,
            "isEditable": false
          },
          "loc_code_to": {
            "visible": false,
            "isEditable": false
          },
          "loc_desc_fr": {
            "visible": false,
            "isEditable": false
          },
          "loc_desc_to": {
            "visible": false,
            "isEditable": false
          },
          "prf_pers_id": {
            "visible": false,
            "isEditable": false
          },
          "acct_no": {
            "visible": false,
            "isEditable": false
          },
          "prf_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "dest_id": {
            "visible": false,
            "isEditable": false
          },
          "cl_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "cl_doc_suspended": {
            "visible": false,
            "isEditable": false
          },
          "cl_terms": {
            "visible": false,
            "isEditable": false
          },
          "cl_tx_type": {
            "visible": false,
            "isEditable": false
          },
          "purchase_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "doc_expected_dt": {
            "visible": false,
            "isEditable": false
          },
          "orgn_unit_full_name": {
            "visible": true,
            "isEditable": false
          },
          "person_name": {
            "visible": true,
            "isEditable": false
          },
          "person_code": {
            "visible": true,
            "isEditable": false
          },
          "orgn_unit_code": {
            "visible": true,
            "isEditable": false
          },
          "dest_desc": {
            "visible": false,
            "isEditable": false
          },
          "doc_dt": {
            "visible": true,
            "isEditable": false
          },
          "doc_ref": {
            "visible": true,
            "isEditable": false
          },
          "doc_desc": {
            "visible": true,
            "isEditable": false
          },
          "doc_post_dt": {
            "visible": false,
            "isEditable": false
          },
          "doc_currency": {
            "visible": true,
            "isEditable": false
          },
          "doc_currency_rate": {
            "visible": true,
            "isEditable": false
          },
          "doc_cur_xchg_unit": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "contact": {
        "alias": "contact",
        "isEditable": false,
        "row": {
          "isMultiRow": false,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": false,
            "isEditable": false
          },
          "cl_entity_loc_name": {
            "visible": false,
            "isEditable": false
          },
          "mail_orgn_id": {
            "visible": false,
            "isEditable": false
          },
          "mail_acct_id": {
            "visible": false,
            "isEditable": false
          },
          "ship_orgn_id": {
            "visible": false,
            "isEditable": false
          },
          "ship_acct_id": {
            "visible": false,
            "isEditable": false
          },
          "add_id": {
            "visible": false,
            "isEditable": false
          },
          "cl_instruction": {
            "visible": true,
            "isEditable": false
          },
          "cl_contact_pers": {
            "visible": true,
            "isEditable": false
          },
          "cl_mail_addr1": {
            "visible": true,
            "isEditable": false
          },
          "cl_mail_addr2": {
            "visible": true,
            "isEditable": false
          },
          "cl_mail_addr3": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_contact_pers": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_addr2": {
            "visible": true,
            "isEditable": false
          },
          "cl_mail_postcode": {
            "visible": true,
            "isEditable": false
          },
          "cl_tel": {
            "visible": true,
            "isEditable": false
          },
          "cl_fax": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_addr1": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_addr3": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_postcode": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_tel": {
            "visible": true,
            "isEditable": false
          },
          "cl_ship_fax": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "security": {
        "alias": "security",
        "isEditable": false,
        "row": {
          "isMultiRow": false,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": false,
            "isEditable": false
          },
          "doc_checkedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_approvedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_approved": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_checked": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_prepared": {
            "visible": true,
            "isEditable": false
          },
          "doc_postedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_posted": {
            "visible": true,
            "isEditable": false
          },
          "doc_preparedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_cancelledby": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_cancelled": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_closed": {
            "visible": true,
            "isEditable": false
          },
          "doc_closedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_lastupdate": {
            "visible": true,
            "isEditable": false
          },
          "doc_committed": {
            "visible": true,
            "isEditable": false
          },
          "doc_dt_lastprint": {
            "visible": true,
            "isEditable": false
          },
          "doc_print_sequence": {
            "visible": true,
            "isEditable": false
          },
          "doc_lastupdatedby": {
            "visible": true,
            "isEditable": false
          },
          "doc_last_reprinted_by": {
            "visible": true,
            "isEditable": false
          },
          "doc_post_sequence": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "details": {
        "alias": "details",
        "isEditable": false,
        "row": {
          "isMultiRow": true,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "entry_no_a0": {
            "visible": false,
            "isEditable": false
          },
          "doc_id": {
            "visible": false,
            "isEditable": false
          },
          "acct_id": {
            "visible": false,
            "isEditable": false
          },
          "entry_ref": {
            "visible": false,
            "isEditable": false
          },
          "entry_debit": {
            "visible": false,
            "isEditable": false
          },
          "entry_credit": {
            "visible": false,
            "isEditable": false
          },
          "entry_seq": {
            "visible": false,
            "isEditable": false
          },
          "doc_tx_type_id": {
            "visible": false,
            "isEditable": false
          },
          "entry_currency_code": {
            "visible": false,
            "isEditable": false
          },
          "entry_currency_rate": {
            "visible": false,
            "isEditable": false
          },
          "entry_cur_debit": {
            "visible": false,
            "isEditable": false
          },
          "entry_cur_xchg_unit": {
            "visible": false,
            "isEditable": false
          },
          "prd_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "prd_entry_no": {
            "visible": false,
            "isEditable": false
          },
          "prd_id": {
            "visible": false,
            "isEditable": false
          },
          "prd_serial_no": {
            "visible": false,
            "isEditable": false
          },
          "prd_model": {
            "visible": false,
            "isEditable": false
          },
          "prd_qty_credit": {
            "visible": false,
            "isEditable": false
          },
          "prd_owner_id_fr": {
            "visible": false,
            "isEditable": false
          },
          "prd_owner_id_to": {
            "visible": false,
            "isEditable": false
          },
          "prd_loc_id_fr": {
            "visible": false,
            "isEditable": false
          },
          "prd_loc_id_to": {
            "visible": false,
            "isEditable": false
          },
          "prd_bin_id_fr": {
            "visible": false,
            "isEditable": false
          },
          "prd_bin_id_to": {
            "visible": false,
            "isEditable": false
          },
          "prd_qtyinlowestunit": {
            "visible": false,
            "isEditable": false
          },
          "prd_package_id": {
            "visible": false,
            "isEditable": false
          },
          "prd_igp": {
            "visible": false,
            "isEditable": false
          },
          "prd_ref_desc": {
            "visible": false,
            "isEditable": false
          },
          "purchase_doc_id": {
            "visible": false,
            "isEditable": false
          },
          "purchase_entry_no": {
            "visible": false,
            "isEditable": false
          },
          "entry_orgn_id": {
            "visible": false,
            "isEditable": false
          },
          "entry_warranty_prd": {
            "visible": false,
            "isEditable": false
          },
          "entry_trans_method": {
            "visible": false,
            "isEditable": false
          },
          "prd_assign_serial_no": {
            "visible": false,
            "isEditable": false
          },
          "doc_tx_name": {
            "visible": false,
            "isEditable": false
          },
          "orgn_unit_code": {
            "visible": false,
            "isEditable": false
          },
          "orgn_unit_name": {
            "visible": false,
            "isEditable": false
          },
          "owner_code_fr": {
            "visible": false,
            "isEditable": false
          },
          "owner_name_fr": {
            "visible": false,
            "isEditable": false
          },
          "owner_code_to": {
            "visible": false,
            "isEditable": false
          },
          "owner_name_to": {
            "visible": false,
            "isEditable": false
          },
          "loc_code_fr": {
            "visible": false,
            "isEditable": false
          },
          "loc_desc_fr": {
            "visible": false,
            "isEditable": false
          },
          "loc_code_to": {
            "visible": false,
            "isEditable": false
          },
          "loc_desc_to": {
            "visible": false,
            "isEditable": false
          },
          "bin_code_fr": {
            "visible": false,
            "isEditable": false
          },
          "bin_desc_fr": {
            "visible": false,
            "isEditable": false
          },
          "bin_code_to": {
            "visible": false,
            "isEditable": false
          },
          "bin_desc_to": {
            "visible": false,
            "isEditable": false
          },
          "prd_ref_id": {
            "visible": false,
            "isEditable": false
          },
          "isnewprd": {
            "visible": false,
            "isEditable": false
          },
          "totalcredit": {
            "visible": true,
            "isEditable": false
          },
          "entry_cur_credit": {
            "visible": true,
            "isEditable": false
          },
          "entry_line_no": {
            "visible": true,
            "isEditable": false
          },
          "prd_code": {
            "visible": true,
            "isEditable": false
          },
          "entry_desc": {
            "visible": true,
            "isEditable": false
          },
          "prd_qty_debit": {
            "visible": true,
            "isEditable": false
          },
          "prd_uom": {
            "visible": true,
            "isEditable": false
          },
          "entry_expected_dt": {
            "visible": true,
            "isEditable": false
          },
          "prd_price": {
            "visible": true,
            "isEditable": false
          },
          "entry_remarks": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "currency": {
        "alias": "currency",
        "isEditable": false,
        "row": {
          "isMultiRow": false,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "currency_code": {
            "visible": true,
            "isEditable": false
          },
          "exchange_unit": {
            "visible": true,
            "isEditable": false
          },
          "exchange_rate": {
            "visible": true,
            "isEditable": false
          },
          "currency_symbol": {
            "visible": true,
            "isEditable": false
          },
          "currency_name": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "prdalias": {
        "alias": "prdalias",
        "isEditable": false,
        "row": {
          "isMultiRow": true,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": true,
            "isEditable": false
          },
          "entry_no": {
            "visible": true,
            "isEditable": false
          },
          "prd_alias_code": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "supplier": {
        "alias": "supplier",
        "isEditable": false,
        "row": {
          "isMultiRow": false,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": false,
            "isEditable": false
          },
          "acct_id": {
            "visible": false,
            "isEditable": false
          },
          "orgn_contact_person": {
            "visible": true,
            "isEditable": false
          },
          "orgn_address1": {
            "visible": true,
            "isEditable": false
          },
          "orgn_address2": {
            "visible": true,
            "isEditable": false
          },
          "orgn_address3": {
            "visible": true,
            "isEditable": false
          },
          "orgn_phone": {
            "visible": true,
            "isEditable": false
          },
          "orgn_postcode": {
            "visible": true,
            "isEditable": false
          },
          "orgn_faxno": {
            "visible": true,
            "isEditable": false
          },
          "email_address": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "detailstype": {
        "alias": "detailstype",
        "isEditable": false,
        "row": {
          "isMultiRow": true,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "doc_id": {
            "visible": true,
            "isEditable": false
          },
          "entry_no": {
            "visible": true,
            "isEditable": false
          },
          "entrycategory": {
            "visible": true,
            "isEditable": false
          },
          "entrytype": {
            "visible": true,
            "isEditable": false
          }
        }
      },
      "eventemitter": {
        "alias": "eventemitter",
        "isEditable": false,
        "row": {
          "isMultiRow": true,
          "permission": {
            "add": false,
            "delete": false
          }
        },
        "column": {
          "event_id": {
            "visible": true,
            "isEditable": true
          },
          "event_description": {
            "visible": true,
            "isEditable": true
          },
          "event_date": {
            "visible": true,
            "isEditable": true
          },
          "event_action": {
            "visible": true,
            "isEditable": true
          },
          "event_spid": {
            "visible": true,
            "isEditable": true
          },
          "event_connection": {
            "visible": true,
            "isEditable": true
          },
          "event_procid": {
            "visible": true,
            "isEditable": true
          },
          "event_source": {
            "visible": true,
            "isEditable": true
          }
        }
      }
    }
  }
  */
