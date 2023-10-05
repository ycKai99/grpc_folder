export interface LeaveApplicationPeriodProfileSchedule {
    DataService?: DWDataService;
}
export interface DWDataService {
    py_prd_code_id?: number;
    py_prd_sch_id?: number;
    py_prd_sch_prd_no?: number;
    py_prd_sch_date_fr?: string;
    py_prd_sch_date_to?: string;
    py_prd_sch_pay_code?: string;
}
