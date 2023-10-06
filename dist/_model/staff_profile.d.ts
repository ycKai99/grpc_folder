export declare type staff_profile_type = {
    id: number;
    bioData?: {
        rows: {
            row: {
                rowId: string;
                rowNumber: number;
                column: {
                    pers_id?: number;
                    pers_name: string;
                    pers_new_ic: string;
                    pers_sex: string;
                    pers_code?: string;
                    pers_dob: string;
                    pers_race: string;
                    pers_religion: string;
                    pers_marital: string;
                };
            }[];
        };
    };
    employeeData?: {
        rows: {
            row: {
                rowId: string;
                rowNumber: number;
                column: {
                    emp_id?: number;
                    emp_employ_type: string;
                    emp_number?: string;
                };
            }[];
        };
    };
    postData?: {
        rows: {
            row: {
                rowId: string;
                rowNumber: number;
                column: {
                    emp_post_scale_id: number;
                    emp_role_datestart: string;
                    emp_role_dateend?: string;
                    emp_post_date_confirm?: string;
                    emp_post_pay_type: string;
                    emp_bd_dr_amount: number;
                    emp_bd_currency_code: string;
                    emp_post_frq_process: number;
                    emp_post_pay_mode: number;
                    emp_role_id?: number;
                    emp_role_orgn_id: number;
                    emp_post_id: number;
                    emp_role_status: string;
                };
            }[];
        };
    };
    bankData?: {
        rows: {
            row: {
                rowId: string;
                rowNumber: number;
                column: {
                    emp_bank_acc_no: string;
                    emp_bank_default_amt: number;
                };
            }[];
        };
    };
    insuranceData?: {
        rows: {
            row: {
                rowId: string;
                rowNumber: number;
                column: {
                    ins_policy_ref_no: string;
                };
            }[];
        };
    };
    rawdata: any;
};
