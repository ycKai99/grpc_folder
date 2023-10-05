export type FFBProductionData = {
    sec_code: string,
    total_act_qty: string, // This is a number
    sumplanted: string, // This is a number
    sumunplanted: string, // This is a number
    orgn_full_name: string,
    orgn_comp_reg_no: string,
    orgn_address1: string,
    orgn_address2: string,
    orgn_address3: string,
    wbc_date: string,
    no_of_bunches: string, // This is a number
    tday: string,
    tyear: number,
    tmonth: number
}

export type FFBProductionSummaryData = {
    section_profile_sec_code: string,
    dmy_template_tyear: number,
    dmy_template_tmonth: number,
    dmy_template_tday: number,
    sumplanted: string, // This is a number
    sumunplanted: string, // This is a number
    orgn_profile_company_v_orgn_full_name: string,
    orgn_profile_company_v_orgn_comp_reg_no: string,
    orgn_profile_company_v_orgn_address1: string,
    orgn_profile_company_v_orgn_address2: string,
    orgn_profile_company_v_orgn_address3: string,
    wbc_date: string,
    compute_1: string,
    compute_2: string,
    compute_3: string,
    no_of_bunches: number
}

// Test
// const test:FFBProductionData =
// {
//      sec_code :  PH05 ,
//      total_act_qty :  52.1600 ,
//      sumplanted :  2374.3800 ,
//      sumunplanted :  0.0000 ,
//      orgn_full_name :  Palmcol Sdn Bhd ,
//      orgn_comp_reg_no :  437701-K ,
//      orgn_address1 :  25.1-25.2, Level 25, Wisma Sanyan ,
//      orgn_address2 :  No. 1, Jalan Sanyan ,
//      orgn_address3 :  Sibu Sarawak ,
//      wbc_date :  22/01/2016 12:00:00 AM ,
//      no_of_bunches :  6933 ,
//      tday :  22 ,
//      tyear : 2016,
//      tmonth : 1
// }
// const test2:FFBProductionSummaryData =
// {
//      section_profile_sec_code :  PH01 ,
//      dmy_template_tyear : 2011,
//      dmy_template_tmonth : 1,
//      dmy_template_tday : 2,
//      sumplanted :  2008.5600 ,
//      sumunplanted :  0.0000 ,
//      orgn_profile_company_v_orgn_full_name :  Palmcol Sdn Bhd ,
//      orgn_profile_company_v_orgn_comp_reg_no :  437701-K ,
//      orgn_profile_company_v_orgn_address1 :  25.1-25.2, Level 25, Wisma Sanyan ,
//      orgn_profile_company_v_orgn_address2 :  No. 1, Jalan Sanyan ,
//      orgn_profile_company_v_orgn_address3 :  Sibu Sarawak ,
//      wbc_date :  02/01/2011 12:00:00 AM ,
//      compute_1 :  Palmcol Sdn Bhd (437701-K) ,
//      compute_2 :  25.1-25.2, Level 25, Wisma Sanyan  No. 1, Jalan Sanyan  Sibu Sarawak ,
//      compute_3 :  DAILY FFB PRODUCTION FOR , 2011 ,
//      no_of_bunches : 2630
// }