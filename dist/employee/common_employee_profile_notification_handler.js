"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.common_employee_profile_notification_class = void 0;
const base_notification_handler_1 = require("../base/base_notification_handler");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
class common_employee_profile_notification_class extends base_notification_handler_1.base_notification_handler_class {
    constructor() {
        super(...arguments);
        this.employee_profile_service_id = "Employee Profile";
        this.employee_profile_ds_service_id = "Employee Profile Data";
        this.source_staff_info = { id: -1, rawdata: "" };
        this.target_staff_info = { id: -1, rawdata: "" };
    }
    set_handler_id(handler_id) {
        this.handler_id = handler_id;
    }
    get_handler_id() {
        return this.handler_id;
    }
    // retrieve
    data_transfer_retrieve() {
        // Retrieve with data service according to notification
        let handler_id = this.get_handler_id();
        // Get notified Id
        this.source_pers_id = this.handlers[handler_id].notification.data["DatabaseNotificationData"]["ID"];
        this.source_database = this.handlers[handler_id].notification.header.messageDestination.DataSource;
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_ds_service_id,
            "parameter": "id=" + this.source_pers_id.toString()
        }; // context-sensitive  
        let new_step_ind = this.create_message(handler_id, export_1.Command.Retrieve, this.payload); // Pass required info
        // Retrieve data service
        return this.send_message(handler_id, new_step_ind).then((response) => {
            // Check data service response, then, retrieve with TM service program for full data
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response.");
            }
            else {
                if (response["data"] == 'Access Denied: You are not authorized to access FIS Application.') {
                    throw new Error("Invalid response." + response["data"]);
                }
                if (response["data"] == 'Person not found.') {
                    throw new Error("Invalid response." + response["data"]);
                }
                try {
                    this.source_raw = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"][0]["column"];
                }
                catch (e) {
                    throw new Error("Invalid response row." + e);
                }
                // Get document data for retrieval
                this.source_raw = response["data"]["GenericFisData"]["data"]["DataService"]["rows"]["row"][0]["column"];
                this.source_pers_id = this.source_raw["pers_id"];
                this.source_pers_name = this.source_raw["pers_name"];
                this.source_emp_id = this.source_raw["emp_id"];
                this.source_emp_number = this.source_raw["emp_number"];
                // Set payload
                this.payload = {
                    "UCP_Id": this.UCP_Id,
                    "ServiceID": this.employee_profile_service_id,
                    "argument": this.source_pers_id + ","
                        + this.source_emp_number + ","
                        + this.source_pers_name + ","
                        + this.source_emp_id + ","
                        + this.source_emp_id, // this.retrieve_id.toString()
                };
                if (!this.payload["argument"]) {
                    throw new Error("Invalid source employee profile argument.");
                }
                let new_step_ind = this.create_message(handler_id, export_1.Command.Retrieve, this.payload); // Pass required info
                // Get full profile data 
                return this.send_message(handler_id, new_step_ind).then((response) => {
                    if (!response["data"] || response["data"] == 'token no longer valid') {
                        throw new Error("Invalid response.");
                    }
                    if (!response["data"]["GenericFisData"]) {
                        throw new Error("Invalid response." + JSON.stringify(response["data"]));
                    }
                    // Get role ID
                    this.source_role_id = response["data"]["GenericFisData"]["data"]["postlist"]["rows"]["row"][0]["column"]["ps_emp_post_emp_role_id"];
                    // Execute ue_retrieve_postdetails_ext
                    // Set payload
                    this.payload = {
                        "UCP_Id": this.UCP_Id,
                        "ServiceID": this.employee_profile_service_id,
                        "parameter": "objecttype=DI,alias=postdetails,eventname=ue_retrieve_postdetails_ext,role_id=" + this.source_role_id,
                        "dataRow": null
                    };
                    if (!this.payload["parameter"]) {
                        throw new Error("Invalid source employee profile parameter.");
                    }
                    let new_step_ind = this.create_message(handler_id, export_1.Command.Execute, this.payload); // Pass required info
                    // Execute
                    return this.send_message(handler_id, new_step_ind).then((response) => {
                        if (!response["data"] || response["data"] == 'token no longer valid') {
                            throw new Error("Invalid response.");
                        }
                        if (response["data"]["StatusResponse"] && response["data"]["StatusResponse"]["status"] != 1) {
                            throw new Error("Invalid response." + JSON.stringify(response["data"]));
                        }
                        // Set payload
                        this.payload = {
                            "UCP_Id": this.UCP_Id,
                            "ServiceID": this.employee_profile_service_id,
                            "argument": {},
                            "dataRow": null
                        };
                        let new_step_ind = this.create_message(handler_id, export_1.Command.Retrieve, this.payload); // Pass required info
                        // Get full profile data (again)
                        return this.send_message(handler_id, new_step_ind).then((response) => {
                            if (!response["data"] || response["data"] == 'token no longer valid') {
                                throw new Error("Invalid response.");
                            }
                            if (!response["data"]["GenericFisData"]) {
                                throw new Error("Invalid response." + JSON.stringify(response["data"]));
                            }
                            // Set and store staff information
                            let new_staff = { id: -1, rawdata: "" };
                            new_staff.rawdata = response["data"]["GenericFisData"]["data"];
                            new_staff.bioData = new_staff.rawdata["header"];
                            new_staff.employeeData = new_staff.rawdata["empprof"];
                            new_staff.postData = new_staff.rawdata["postdetails"];
                            new_staff.bankData = new_staff.rawdata["empbank"];
                            new_staff.insuranceData = new_staff.rawdata["empins"];
                            // Fix null date issue
                            if (new_staff.postData.rows.row[0].column.emp_role_dateend == null) {
                                // Wrong converted date issue '0001-01-01 00:00:00.000' instead of '1900-01-01 00:00:00.000' 
                                delete (new_staff.postData.rows.row[0].column.emp_role_dateend);
                            }
                            if (new_staff.postData.rows.row[0].column.emp_post_date_confirm == null) {
                                // Wrong converted date issue '0001-01-01 00:00:00.000' instead of '1900-01-01 00:00:00.000' 
                                delete (new_staff.postData.rows.row[0].column.emp_post_date_confirm);
                            }
                            let num = 30 + handler_id;
                            //2021-01-25 - fbl - No longer need different name and IC as different database is used
                            // let formattedNumber = num.toLocaleString('en-US', {
                            //    minimumIntegerDigits: 2,
                            //    useGrouping: false
                            // }) 
                            // // Fix missing data issue (TEMP for multi-DB)  
                            // new_staff.bioData.rows.row[0].column.pers_name= new_staff.bioData.rows.row[0].column.pers_name+formattedNumber // TEST
                            // new_staff.bioData.rows.row[0].column["pers_alias"]= new_staff.bioData.rows.row[0].column["pers_alias"]+formattedNumber // TEST
                            // new_staff.bioData.rows.row[0].column.pers_new_ic= new_staff.bioData.rows.row[0].column.pers_new_ic+formattedNumber // TEST
                            // // End 2021-01-25 - fbl - No longer need different name and IC as different databae is used
                            /*if(new_staff.bankData.rows.row[0])
                            {
                                new_staff.bankData.rows.row[0].column.emp_bank_acc_no= "test20211129_"+formattedNumber
                            } */ // TEST 
                            // Fix missing data issue (TEMP for multi-DB) 
                            this.source_staff_info = new_staff;
                            //console.log(JSON.stringify(this.source_staff_info["rawdata"]));
                            // Update process status
                            this.set_process_status(handler_id, "Retrieved");
                            this.updateMessagesLocalStorage();
                            return response;
                        });
                    });
                });
            }
        });
    }
    // new
    data_transfer_new(payload) {
        // Create New     
        let handler_id = this.get_handler_id();
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_service_id
        }; // context-sensitive  
        if (payload) {
            this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        let new_step_ind = this.create_message(handler_id, export_1.Command.New, this.payload); // Pass required info 
        return this.send_message(handler_id, new_step_ind).then((response) => {
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response.");
            }
            if (response["data"]["StatusResponse"] && response["data"]["StatusResponse"]["status"] != 1) {
                throw new Error("Invalid response for new." + JSON.stringify(response["data"]));
            }
            if (response["data"]["StatusException"] && response["data"]["StatusException"]["status"] == -1) {
                throw new Error("Error new." + response["data"]["StatusException"]["message"] || "");
            }
            this.target_staff_info["rawdata"] = response["data"];
            // Update process status
            this.set_process_status(handler_id, "New");
            this.updateMessagesLocalStorage();
            return response;
        });
    }
    // append row (Currenly only for new staff)
    data_transfer_sync_row(payload) {
        // Create append row     
        let handler_id = this.get_handler_id();
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_service_id,
        }; // context-sensitive    
        if (payload) {
            this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        let new_step_ind = this.create_message(handler_id, export_1.Command.Retrieve, this.payload); // Pass required info 
        return this.send_message(handler_id, new_step_ind).then((response) => {
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response.");
            }
            if (!response["data"]["GenericFisData"]) {
                throw new Error("Invalid response." + JSON.stringify(response["data"]));
            }
            // Set and store staff information
            let new_staff = { id: -1, rawdata: "" };
            new_staff.rawdata = response["data"]["GenericFisData"]["data"];
            new_staff.bioData = new_staff.rawdata["header"];
            new_staff.employeeData = new_staff.rawdata["empprof"];
            new_staff.postData = new_staff.rawdata["postdetails"];
            new_staff.bankData = new_staff.rawdata["empbank"];
            new_staff.insuranceData = new_staff.rawdata["empins"];
            this.target_staff_info = new_staff;
            for (const [key, value] of Object.entries(this.target_staff_info.rawdata)) {
                if (this.target_staff_info.rawdata[key]["rows"]) {
                    let rowsToAdd = this.source_staff_info.rawdata[key]["rows"]["row"].length - this.target_staff_info.rawdata[key]["rows"]["row"].length;
                    if (rowsToAdd > 0) {
                        for (let rowsNo = 0; rowsNo < rowsToAdd; rowsNo++) {
                            // Create append row     
                            let handler_id = this.get_handler_id();
                            this.payload = {
                                "UCP_Id": this.UCP_Id,
                                "ServiceID": this.employee_profile_service_id,
                                "alias": key,
                                "dataRow": 1
                            }; // context-sensitive  
                            if (payload) {
                                this.payload = Object.assign(Object.assign({}, this.payload), payload);
                            }
                            let new_step_ind = this.create_message(handler_id, export_1.Command.InsertRow, this.payload); // Pass required info 
                            this.send_message(handler_id, new_step_ind).then((response) => {
                                if (!response["data"] || response["data"] == 'token no longer valid') {
                                    throw new Error("Invalid response.");
                                }
                                if (response["data"]["StatusResponse"] && response["data"]["StatusResponse"]["status"] != 1) {
                                    throw new Error("Invalid response for append." + JSON.stringify(response["data"]));
                                }
                                if (response["data"]["StatusException"] && response["data"]["StatusException"]["status"] == -1) {
                                    throw new Error("Error append row." + response["data"]["StatusException"]["message"] || "");
                                }
                                this.target_staff_info["rawdata"] = response["data"];
                                // Update process status
                                this.set_process_status(handler_id, "AppendRow");
                                this.updateMessagesLocalStorage();
                                return response;
                            });
                        }
                    }
                }
            }
        });
    }
    // set item or details
    data_transfer_setColumns(payload) {
        // Set items with this.payload // context-sensitive
        let handler_id = this.get_handler_id();
        let data_row = [];
        // For biodata or header
        for (const [key, value] of Object.entries(this.source_staff_info.bioData.rows.row[0].column)) {
            if (key == "pers_id1"
                || key == "pers_id2"
                || key == "ps_nationality_code_v_name") {
                console.log("Removed " + key);
            }
            else {
                if (!value) { }
                else {
                    data_row.push({
                        "alias": "header",
                        "column": {
                            "row": 1,
                            "name": key,
                            "value": value
                        }
                    });
                }
            }
        }
        // For employeeData or empprof
        for (const [key, value] of Object.entries(this.source_staff_info.employeeData.rows.row[0].column)) {
            if (key == "emp_id"
                || key == "pers_id"
                || key == "acct_id"
                || key == "acct_profile_acct_id"
                || key == "acct_profile_prof_id"
                || key == "emp_number" // Regenerate new employee number
            ) {
                console.log("Removed " + key);
            }
            else {
                data_row.push({
                    "alias": "empprof",
                    "column": {
                        "row": 1,
                        "name": key,
                        "value": value
                    }
                });
            }
        }
        // For postData or postdetails
        for (const [key, value] of Object.entries(this.source_staff_info.postData.rows.row[0].column)) {
            if (key == " ") {
                console.log("Removed " + key);
            }
            else {
                data_row.push({
                    "alias": "postdetails",
                    "column": {
                        "row": 1,
                        "name": key,
                        "value": value
                    }
                });
            }
        }
        // For bankData or empbank
        if (this.source_staff_info.bankData.rows.row[0]) {
            for (const [key, value] of Object.entries(this.source_staff_info.bankData.rows.row[0].column)) {
                if (key == "emp_id"
                    || key == "pers_id"
                    || key == "acct_id"
                    || key == "acct_profile_acct_id"
                    || key == "acct_profile_prof_id"
                    || key == "status"
                    || key == "emp_bank_prof_id"
                    || key == "c_active_count"
                    || key == "c_active_flag"
                    || key == "c_tot_default_amt") {
                    console.log("Removed " + key);
                }
                else {
                    data_row.push({
                        "alias": "empbank",
                        "column": {
                            "row": 1,
                            "name": key,
                            "value": value
                        }
                    });
                }
            }
        }
        // For insuranceData or empins
        if (this.source_staff_info.insuranceData.rows.row[0]) {
            for (const [key, value] of Object.entries(this.source_staff_info.insuranceData.rows.row[0].column)) {
                if (key == " ") {
                    console.log("Removed " + key);
                }
                else {
                    data_row.push({
                        "alias": "empins",
                        "column": {
                            "row": 1,
                            "name": key,
                            "value": value
                        }
                    });
                }
            }
        }
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_service_id,
            "data": data_row
        }; // context-sensitive          
        if (payload) {
            this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        let new_step_ind = this.create_message(handler_id, export_1.Command.SetColumn, this.payload); // Pass required info
        return this.send_message(handler_id, new_step_ind).then((response) => {
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response.");
            }
            if (response["data"] == 'Access Denied: You are not authorized to access FIS Application.') {
                throw new Error("Invalid response." + response["data"]);
            }
            if (response["data"]["StatusException"] && response["data"]["StatusException"]["status"] == -1) {
                throw new Error("Error Set Column." + response["data"]["StatusException"]["message"] || "");
            }
            this.set_process_status(handler_id, "SetColumns");
            this.updateMessagesLocalStorage();
        });
    }
    // save
    data_transfer_save(payload) {
        // Save and get the new id 
        let handler_id = this.get_handler_id();
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_service_id
        }; // context-sensitive 
        if (payload) {
            this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        let new_step_ind = this.create_message(handler_id, export_1.Command.Save, this.payload); // Pass required info
        return this.send_message(handler_id, new_step_ind).then((response) => {
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response.");
            }
            if (response["data"]["StatusResponse"] && response["data"]["StatusResponse"]["status"] != 1) {
                throw new Error("Invalid save response." + response["data"]);
            }
            if (response["data"]["StatusException"] && response["data"]["StatusException"]["status"] == -1) {
                throw new Error("Error save response." + response["data"]["StatusException"]["message"] || "");
            }
            this.set_process_status(handler_id, "Saved");
            this.updateMessagesLocalStorage();
        });
    }
    // Cancel any changes
    data_transfer_cancelchanges(payload) {
        // Cancel any changes
        let handler_id = this.get_handler_id();
        this.payload = {
            "UCP_Id": this.UCP_Id,
            "ServiceID": this.employee_profile_service_id
        }; // context-sensitive   
        if (payload) {
            this.payload = Object.assign(Object.assign({}, this.payload), payload);
        }
        let new_step_ind = this.create_message(handler_id, export_1.Command.CancelChanges, this.payload); // Pass required info
        return this.send_message(handler_id, new_step_ind).then((response) => {
            if (!response["data"] || response["data"] == 'token no longer valid') {
                throw new Error("Invalid response for cancel changes.");
            }
            if (response["data"]["StatusException"]) {
                throw new Error("Error cancel request." + response["data"]["StatusException"]["message"] || "");
            }
        });
    }
    // Override to specify type
    set_process_status(handler_ind, process_status) {
        this.handlers[handler_ind].process_status = process_status;
        return this.handlers[handler_ind];
    }
    // Override for fixing socket connection issue
    async send_message(handler_id, steps_id) {
        let promise; //:Promise<ResponseMessage|FisResponseMessage>;
        for (let ind = 0; ind < this.handlers[handler_id].steps[steps_id].request.length; ind++) {
            promise = new axios_1.HttpService().post(DP_config_1.URLs.NESTWS + "/request", this.MessageService.getDPmessage(this.handlers[handler_id].steps[steps_id].request[ind])) // here is Observable<AxiosResponse> 
                .pipe(rxjs_1.map(resp => resp.data[0])).toPromise(); // converted to Observable<ResponseMessage>  
        }
        return promise;
    }
}
exports.common_employee_profile_notification_class = common_employee_profile_notification_class;
//# sourceMappingURL=common_employee_profile_notification_handler.js.map