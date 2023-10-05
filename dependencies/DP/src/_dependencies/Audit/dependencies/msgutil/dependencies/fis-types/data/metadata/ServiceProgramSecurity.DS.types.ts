/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface ServiceProgramSecurityAccessRightListing {
  ServiceProgramProfileSecurityAccessRightData?: DWServiceProgramProfileSecurityAccessRightData;
}
export interface DWServiceProgramProfileSecurityAccessRightData {
  fisappserviceid?: number;
  serviceid?: string;
  servicename?: string;
  serviceprogram?: string;
  servicetypeid?: number;
  servicetypecode?: string;
  servicetypedesc?: string;
  prg_id?: number;
  doc_type_id?: number;
  prg_startup_prg?: string;
  prg_name?: string;
  prg_desc?: string;
  prg_type?: string;
  prg_obj?: string;
  subs_code?: string;
  prg_others?: string;
  prg_display?: string;
  subs_name?: string;
  user_id?: number;
  user_code?: string;
  user_name?: string;
  orgn_id?: number;
  cannew?: string;
  canmodify?: string;
  candelete?: string;
  canread?: string;
  canverify?: string;
  canapprove?: string;
  cancommit?: string;
  canpost?: string;
  cancancel?: string;
  canvoid?: string;
  specialright?: string;
}
