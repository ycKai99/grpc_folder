"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventTypes = exports.HandlersManager = void 0;
const base_notification_handler_1 = require("./base/base_notification_handler");
const writetofilepath_1 = require("./_utility/writetofilepath");
const readfromfilepath_1 = require("./_utility/readfromfilepath");
const rxjs_1 = require("rxjs");
const modified_leave_application_notification_handler_1 = require("./leave/modified_leave_application_notification_handler");
const canceled_leave_application_notification_handler_1 = require("./leave/canceled_leave_application_notification_handler");
const deleted_leave_application_notification_handler_1 = require("./leave/deleted_leave_application_notification_handler");
const leave_status_monitoring_handler_1 = require("./leave/leave_status_monitoring_handler");
const new_leave_application_notification_handler_1 = require("./leave/new_leave_application_notification_handler");
const approved_leave_application_notification_handler_1 = require("./leave/approved_leave_application_notification_handler");
const register_fingerprint_handler_1 = require("./fingerprint/register_fingerprint_handler");
const verification_fingerprint_handler_1 = require("./fingerprint/verification_fingerprint_handler");
const retrieve_person_handler_1 = require("./fingerprint/retrieve_person_handler");
const retrieve_updated_leave_application_handler_1 = require("./leave/retrieve_updated_leave_application_handler");
const synchronize_leave_application_handler_1 = require("./leave/synchronize_leave_application_handler");
const authorization_fingerprint_handler_1 = require("./fingerprint/authorization_fingerprint_handler");
const remote_fingerprint_synchronization_handler_1 = require("./fingerprint/remote_fingerprint_synchronization_handler");
const export_1 = require("./_dependencies/DP/src/interface/export");
require('dotenv').config();
const TurnOffLeaveApp = process.env.TurnOffLeaveApp || '';
const TurnOffFingerprintApp = process.env.TurnOffFingerprintApp || '';
const TurnOffSampleApp = process.env.TurnOffSampleApp || '';
class HandlersManager {
    constructor(ApplicationName, DP) {
        this.FisHandler_set = {};
        this.commmon_handlers = {};
        this.default_tag = 'base';
        this.serviceId = 'Employee Profile';
        this.new_employee_profile_tag = 'New Employee Profile';
        this.add_employee_profile_tag = 'Add Employee Profile';
        this.modified_employee_profile_tag = 'Modified Employee Profile';
        this.processingObservable = new rxjs_1.Subject();
        this.processingObservable_Modification = new rxjs_1.Subject();
        //subscribe within this part
        this.processingObservable_Cancellation = new rxjs_1.Subject();
        this.processingObservable_Deletion = new rxjs_1.Subject();
        this.processingObservable_LeaveStatus = new rxjs_1.Subject();
        this.processingObservable_NewApplication = new rxjs_1.Subject();
        // public run_process(task_ID:string) {
        //     return this.get_handler_with_Tag(this.default_tag).then( (default_handler)=>{
        //         default_handler.loadMessagesLocalStorage();
        //         // Prepare information
        //         let found_handler_id = -1;
        //         found_handler_id = default_handler.find_handler_id(task_ID);
        //         let tag = default_handler.gethandler(found_handler_id).tag;
        //         // Run process with the appropriate handler
        //         return this.get_handler_with_Tag(tag).then( (newhandler)=>{
        //             newhandler.loadMessagesLocalStorage();
        //             found_handler_id = newhandler.find_handler_id(task_ID);
        //             return newhandler.run_process(found_handler_id).then(()=>{
        //             });
        //         })
        //     })
        // }
        this.processingObservable_Approbation = new rxjs_1.Subject();
        this.processingObservable_register_fingerprint = new rxjs_1.Subject();
        this.processingObservable_verification_fingerprint = new rxjs_1.Subject();
        this.processingObservable_retrieve_person_for_fingerprint = new rxjs_1.Subject();
        this.processingObservable_RetrieveLeaveApplication = new rxjs_1.Subject();
        this.processingObservable_authorization_fingerprint = new rxjs_1.Subject();
        this.processingObservable_remote_fingerprint_synchronization = new rxjs_1.Subject();
        this.processingObservable_SynchronizeLeave = new rxjs_1.Subject();
        this.ApplicationName = ApplicationName;
        this.DP = DP;
        console.log('Constructing in handlers manager.');
        /**TEST processingObservable*/
        if (TurnOffLeaveApp.toLocaleUpperCase() == 'YES') {
        }
        else {
            let handler_retrieveleave = new retrieve_updated_leave_application_handler_1.retrieve_updated_leave_application_class();
            handler_retrieveleave.initialise('leaveretrieval', this.DP, this);
            handler_retrieveleave
                .publishForReceiveLeaveRetrievalRequest(this.processingObservable)
                .subscribe(this.processingObservable_RetrieveLeaveApplication);
            //handler_retrieveleave.subscribeForCheckLeaveModification (this.processingObservable_RetrieveLeaveApplication).subscribe(this.processingObservable_RetrieveLeaveApplication);
            handler_retrieveleave
                .subscribeForRetrieveLeave(this.processingObservable_RetrieveLeaveApplication)
                .subscribe(this.processingObservable);
            handler_retrieveleave
                .subscribeForProcessingCompleted(this.processingObservable_RetrieveLeaveApplication)
                .subscribe(this.processingObservable);
            //handler_retrieveleave.subscribeForProcessingError (this.processingObservable_RetrieveLeaveApplication).subscribe(this.processingObservable_RetrieveLeaveApplication);
            handler_retrieveleave
                .subscribeForConnectionError(this.processingObservable_RetrieveLeaveApplication)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leaveretrieval'] = handler_retrieveleave;
            this.FisHandler_set['leaveretrieval'].Tag = 'leaveretrieval';
            this.FisHandler_set['leaveretrieval'].class_name =
                'retrieve_updated_leave_application_class';
            console.log('Started handler ' +
                this.FisHandler_set['leaveretrieval'].getClassName() +
                '.');
            let handler_leavenew = new new_leave_application_notification_handler_1.new_leave_application_notification_class();
            handler_leavenew.initialise('leavenew', this.DP, this);
            handler_leavenew
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForCheckLeaveNewApplication(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForRetrieveNewLeave(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForUpdateNewApplicationCalenderLeave(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForCheckNewCalenderLeave(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForProcessingCompleted(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable);
            //handler_leavenew.subscribeForProcessingError (this.processingObservable_NewApplication).subscribe(this.processingObservable_NewApplication);
            handler_leavenew
                .subscribeForConnectionError(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leavenew'] = handler_leavenew;
            this.FisHandler_set['leavenew'].Tag = 'leavenew';
            this.FisHandler_set['leavenew'].class_name =
                'new_leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leavenew'].getClassName() +
                '.');
            let handler_leavemodify = new modified_leave_application_notification_handler_1.modified_leave_application_notification_class();
            handler_leavemodify.initialise('leavemodified', this.DP, this);
            handler_leavemodify
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForCheckLeaveModification(this.processingObservable_Modification)
                .subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForRetrieveLeave(this.processingObservable_Modification)
                .subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForUpdateCalenderLeave(this.processingObservable_Modification)
                .subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForCheckCalenderLeave(this.processingObservable_Modification)
                .subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForProcessingCompleted(this.processingObservable_Modification)
                .subscribe(this.processingObservable);
            //handler_leavemodify.subscribeForProcessingError (this.processingObservable_Modification).subscribe(this.processingObservable_Modification);
            handler_leavemodify
                .subscribeForConnectionError(this.processingObservable_Modification)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leavemodified'] = handler_leavemodify;
            this.FisHandler_set['leavemodified'].Tag = 'leavemodified';
            this.FisHandler_set['leavemodified'].class_name =
                'modified_leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leavemodified'].getClassName() +
                '.');
            let handler_leaveapprove = new approved_leave_application_notification_handler_1.approved_leave_application_notification_class();
            handler_leaveapprove.initialise('leavemodified', this.DP, this);
            handler_leaveapprove
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForCheckLeaveApprobation(this.processingObservable_Approbation)
                .subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForRetrieveLeave(this.processingObservable_Approbation)
                .subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForUpdateCalenderLeave(this.processingObservable_Approbation)
                .subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForCheckCalenderLeave(this.processingObservable_Approbation)
                .subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForProcessingCompleted(this.processingObservable_Approbation)
                .subscribe(this.processingObservable);
            //handler_leaveapprove.subscribeForProcessingError (this.processingObservable_Approbation).subscribe(this.processingObservable_Approbation);
            handler_leaveapprove
                .subscribeForConnectionError(this.processingObservable_Approbation)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leaveapproved'] = handler_leaveapprove;
            this.FisHandler_set['leaveapproved'].Tag = 'leaveapproved';
            this.FisHandler_set['leaveapproved'].class_name =
                'approved_leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leaveapproved'].getClassName() +
                '.');
            let handler_leavecancel = new canceled_leave_application_notification_handler_1.canceled_leave_application_notification_class();
            handler_leavecancel.initialise('leavecancel', this.DP, this);
            handler_leavecancel
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForCheckLeaveCancellation(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForRetrieveCancelledLeave(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForUpdateCancelledCalenderLeave(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForCheckCancelledCalenderLeave(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForProcessingCompleted(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable);
            //handler_leavecancel.subscribeForProcessingError (this.processingObservable_Cancellation).subscribe(this.processingObservable_Cancellation);
            handler_leavecancel
                .subscribeForConnectionError(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leavecancel'] = handler_leavecancel;
            this.FisHandler_set['leavecancel'].Tag = 'leavecancel';
            this.FisHandler_set['leavecancel'].class_name =
                'canceled_leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leavecancel'].getClassName() +
                '.');
            let handler_leavedelete = new deleted_leave_application_notification_handler_1.deleted_leave_application_notification_class();
            handler_leavedelete.initialise('leavedelete', this.DP, this);
            handler_leavedelete
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_Deletion);
            handler_leavedelete
                .subscribeForCheckLeaveDeleted(this.processingObservable_Deletion)
                .subscribe(this.processingObservable_Deletion);
            handler_leavedelete
                .subscribeForUpdateDeletedCalenderLeave(this.processingObservable_Deletion)
                .subscribe(this.processingObservable_Deletion);
            handler_leavedelete
                .subscribeForCheckDeletedCalenderLeave(this.processingObservable_Deletion)
                .subscribe(this.processingObservable_Deletion);
            handler_leavedelete
                .subscribeForProcessingCompleted(this.processingObservable_Deletion)
                .subscribe(this.processingObservable);
            //handler_leavedelete.subscribeForProcessingError (this.processingObservable_Deletion).subscribe(this.processingObservable_Deletion);
            handler_leavedelete
                .subscribeForConnectionError(this.processingObservable_Deletion)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leavedelete'] = handler_leavedelete;
            this.FisHandler_set['leavedelete'].Tag = 'leavedelete';
            this.FisHandler_set['leavedelete'].class_name =
                'deleted_leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leavedelete'].getClassName() +
                '.');
            // Start general message subscription (Leave Status)
            let handler_leavestatus = new leave_status_monitoring_handler_1.leave_status_monitoring_class();
            handler_leavestatus.initialise('leavestatus', this.DP, this);
            handler_leavestatus
                .publishForReceiveLeaveNotification(this.processingObservable)
                .subscribe(this.processingObservable_LeaveStatus);
            handler_leavestatus
                .subscribeForRetrieveLeaveDetails(this.processingObservable_LeaveStatus)
                .subscribe(this.processingObservable_LeaveStatus);
            handler_leavestatus
                .subscribeForProcessingCompleted(this.processingObservable_LeaveStatus)
                .subscribe(this.processingObservable);
            //handler_leavestatus.subscribeForProcessingError (this.processingObservable_LeaveStatus).subscribe(this.processingObservable_LeaveStatus);
            handler_leavestatus
                .subscribeForConnectionError(this.processingObservable_LeaveStatus)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['leavestatus'] = handler_leavestatus;
            this.FisHandler_set['leavestatus'].Tag = 'leavestatus';
            this.FisHandler_set['leavestatus'].class_name =
                'leave_application_notification_class';
            console.log('Started handler ' +
                this.FisHandler_set['leavestatus'].getClassName() +
                '.');
            // Start synchronise subscription
            let handler_synchronizeleave = new synchronize_leave_application_handler_1.synchronize_leave_application_class();
            handler_synchronizeleave.initialise('synchronizeleave', this.DP, this);
            handler_synchronizeleave
                .publishForLoginSynchronizationLeave(this.processingObservable)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .publishForSynchronizationLeaveRequested(this.processingObservable)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveStarted(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable_NewApplication);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveStarted(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable_Approbation);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveStarted(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable_Cancellation);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveStarted(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable_Modification);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveEnded(this.processingObservable_NewApplication)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveEnded(this.processingObservable_Approbation)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveEnded(this.processingObservable_Cancellation)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForSynchronizationNextLeaveEnded(this.processingObservable_Modification)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForSynchronizationLeaveComplete(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable_SynchronizeLeave);
            handler_synchronizeleave
                .subscribeForProcessingCompleted(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable);
            //handler_leavestatus.subscribeForProcessingError (this.processingObservable_LeaveStatus).subscribe(this.processingObservable_LeaveStatus);
            handler_synchronizeleave
                .subscribeForConnectionError(this.processingObservable_SynchronizeLeave)
                .subscribe(this.processingObservable); // Able to trigger restart
            this.FisHandler_set['synchronizeleave'] = handler_synchronizeleave;
            this.FisHandler_set['synchronizeleave'].Tag = 'synchronizeleave';
            this.FisHandler_set['synchronizeleave'].class_name =
                'synchronize_leave_application_class';
            console.log('Started handler ' +
                this.FisHandler_set['synchronizeleave'].getClassName() +
                '.');
        }
        if (TurnOffFingerprintApp.toLocaleUpperCase() == 'YES') {
        }
        else {
            // verification fingeprint
            let handler_verification_fingerprint = new verification_fingerprint_handler_1.verification_fingerprint_class();
            handler_verification_fingerprint.initialise('verification_fingerprint', this.DP, this);
            handler_verification_fingerprint
                .publishForNewFPReceived(this.processingObservable)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForNewFPReceived(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForNewFPStored(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForRegisteredFPReceived(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForUnregisteredFPReceived(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForProcessingCompleted(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable);
            handler_verification_fingerprint
                .subscribeForProcessingError(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable_verification_fingerprint);
            handler_verification_fingerprint
                .subscribeForConnectionError(this.processingObservable_verification_fingerprint)
                .subscribe(this.processingObservable);
            this.FisHandler_set['verification_fingerprint'] =
                handler_verification_fingerprint;
            this.FisHandler_set['verification_fingerprint'].Tag =
                'verification_fingerprint';
            this.FisHandler_set['verification_fingerprint'].class_name =
                'verification_fingerprint_class';
            // register fingerprint
            let handler_register_fingerprint = new register_fingerprint_handler_1.register_fingerprint_class();
            handler_verification_fingerprint.initialise('register_fingerprint', this.DP, this);
            handler_register_fingerprint
                .subscribeForRegisterFPReceived(this.processingObservable)
                .subscribe(this.processingObservable_register_fingerprint);
            handler_register_fingerprint
                .subscribeForRegistrationFPStarted(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable); //Notify Started
            handler_register_fingerprint
                .subscribeForRegisterFPInProgressRequested(this.processingObservable)
                .subscribe(this.processingObservable_register_fingerprint);
            handler_register_fingerprint
                .subscribeForRegisterFPInProgress(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable);
            handler_register_fingerprint
                .subscribeForRegisteredFPCompletedRequested(this.processingObservable)
                .subscribe(this.processingObservable_register_fingerprint);
            handler_register_fingerprint
                .subscribeForRegisteredFPCompleted(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable);
            handler_register_fingerprint
                .subscribeForProcessingCompleted(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable_register_fingerprint);
            handler_register_fingerprint
                .subscribeForProcessingError(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable_register_fingerprint);
            handler_register_fingerprint
                .subscribeForConnectionError(this.processingObservable_register_fingerprint)
                .subscribe(this.processingObservable);
            this.FisHandler_set['register_fingerprint'] =
                handler_register_fingerprint;
            this.FisHandler_set['register_fingerprint'].Tag = 'register_fingerprint';
            this.FisHandler_set['register_fingerprint'].class_name =
                'register_fingerprint_class';
            //console.log("Started handler "+this.FisHandler_set["register_fingerprint"].getClassName()+".");
            // retrieve person(for fingerprint)
            let handler_retrieve_person_for_fingerprint = new retrieve_person_handler_1.retrieve_person_for_fingerprint_class();
            // handler_retrieve_person_for_fingerprint.publishForReceiveLeaveNotification(this.processingObservable).subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .publishForReceivePersonRequested(this.processingObservable)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForLoginCompleted(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForRetrievedPersonInfo(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForRetrievedOrganisationInfo(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForRetrievedServiceProgramData(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForProcessingCompleted(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable);
            handler_retrieve_person_for_fingerprint
                .subscribeForProcessingError(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable_retrieve_person_for_fingerprint);
            handler_retrieve_person_for_fingerprint
                .subscribeForConnectionError(this.processingObservable_retrieve_person_for_fingerprint)
                .subscribe(this.processingObservable);
            this.FisHandler_set['retrieve_person_for_fingerprint'] =
                handler_retrieve_person_for_fingerprint;
            this.FisHandler_set['retrieve_person_for_fingerprint'].Tag =
                'retrieve_person_for_fingerprint';
            this.FisHandler_set['retrieve_person_for_fingerprint'].class_name =
                'retrieve_person_for_fingerprint_class';
            //console.log("Started handler "+this.FisHandler_set["retrieve_person_for_fingerprint"].getClassName()+".");
            // authorization fingerprint
            let handler_authorization_fingerprint = new authorization_fingerprint_handler_1.authorization_fingerprint_class();
            handler_authorization_fingerprint
                .publishForAuthorizationRequested(this.processingObservable)
                .subscribe(this.processingObservable_authorization_fingerprint);
            handler_authorization_fingerprint
                .subscribeForAuthorization(this.processingObservable_authorization_fingerprint)
                .subscribe(this.processingObservable_authorization_fingerprint);
            handler_authorization_fingerprint
                .subscribeForAuthorizationComplete(this.processingObservable_authorization_fingerprint)
                .subscribe(this.processingObservable);
            this.FisHandler_set['authorization_fingerprint'] =
                handler_authorization_fingerprint;
            this.FisHandler_set['authorization_fingerprint'].Tag =
                'authorization_fingerprint';
            this.FisHandler_set['authorization_fingerprint'].class_name =
                'authorization_fingerprint_class';
            //console.log("Started handler "+this.FisHandler_set["authorization_fingerprint_class"].getClassName()+".");
            // remote fingerprint synchronization
            let handler_remote_fingerprint_synchronization = new remote_fingerprint_synchronization_handler_1.remote_fingerprint_synchronization_class();
            handler_remote_fingerprint_synchronization
                .publishForRemoteFingerprintSynchronizationRequested(this.processingObservable)
                .subscribe(this.processingObservable_remote_fingerprint_synchronization);
            handler_remote_fingerprint_synchronization
                .subscribeForSynchronizationNextFingerprintStarted(this.processingObservable_remote_fingerprint_synchronization)
                .subscribe(this.processingObservable_remote_fingerprint_synchronization);
            handler_remote_fingerprint_synchronization
                .subscribeForProcessingCompleted(this.processingObservable_remote_fingerprint_synchronization)
                .subscribe(this.processingObservable);
            this.FisHandler_set['remote_fingerprint_synchronization'] =
                handler_remote_fingerprint_synchronization;
            this.FisHandler_set['remote_fingerprint_synchronization'].Tag =
                'remote_fingerprint_synchronization';
            this.FisHandler_set['remote_fingerprint_synchronization'].class_name =
                'remote_fingerprint_synchronization_class';
            //console.log("Started handler "+this.FisHandler_set["remote_fingerprint_synchronization_class"].getClassName()+".");
        }
        if (TurnOffSampleApp.toLocaleUpperCase() == 'YES') {
        }
        else {
            let base_handler = new base_notification_handler_1.base_notification_handler_class();
            base_handler.initialise('base', this.DP, this);
            base_handler
                .publishFor1st(this.processingObservable)
                .subscribe(this.processingObservable);
            // base_handler.subscribeForOperationA(this.processingObservable).subscribe(this.processingObservable);
            // base_handler.subscribeForOperationB (this.processingObservable).subscribe(this.processingObservable);
            // base_handler.subscribeForOperationC (this.processingObservable).subscribe(this.processingObservable);
            // base_handler.trigger_test_message(this.processingObservable)
            this.FisHandler_set['base'] = base_handler;
            this.FisHandler_set['base'].Tag = 'base';
            this.FisHandler_set['base'].class_name =
                'base_notification_handler_class';
            //console.log("Started handler "+this.FisHandler_set["base"].getClassName()+".");
        }
        // Start the server's subscription
        let startMessage = {
            requestId: 'Start_' + new export_1.Uuid().generateId(),
            eventType: eventTypes.Start,
            message: DP.getMessageService().getNotificationMessage('Internal', 'Server started.'),
        };
        this.processingObservable.next(startMessage);
    }
    get_handler_with_Tag(tag) {
        let handler;
        if (tag > '') {
            handler = this.FisHandler_set[tag];
        }
        else {
            handler = this.FisHandler_set[this.default_tag];
        }
        return handler;
    }
    notify(msg) {
        let responseMsg;
        if (!msg) {
            let req_msg = this.DP.getMessageService().getCommandMessage(msg.header.security.ucpId, export_1.Command.Execute, msg);
            let error_msg = {
                status: '-1',
                message: 'Invalid notification message.',
            };
            responseMsg = this.DP.getMessageService().getResponseStatusMessage(msg.header.security.ucpId, error_msg, req_msg, export_1.ResponseStatus.ExecutionException);
        }
        else if (msg.header.messageType != export_1.AppMessageType.Notification) {
            let req_msg = this.DP.getMessageService().getCommandMessage(msg.header.security.ucpId, export_1.Command.Execute, msg);
            let error_msg = {
                status: '-1',
                message: 'Invalid notification message type.',
            };
            responseMsg = this.DP.getMessageService().getResponseStatusMessage(msg.header.security.ucpId, error_msg, req_msg, export_1.ResponseStatus.ExecutionException);
        }
        else {
            let req_msg = this.DP.getMessageService().getCommandMessage(msg.header.security.ucpId, export_1.Command.Execute, msg);
            responseMsg = this.DP.getMessageService().getResponseStatusMessage(msg.header.security.ucpId, { status: 1 }, req_msg, export_1.ResponseStatus.AcknowledgeReceived);
            // Emit notification to observable
            this.processingObservable.next(msg);
        }
        return responseMsg;
    }
    update_handlers(commmon_handlers, callbackhandler) {
        writetofilepath_1.writetofilepath('observer', 'observerHandlerSteps', commmon_handlers, callbackhandler);
        this.refresh_handlers(commmon_handlers);
    }
    refresh_handlers(commmon_handlers) {
        for (const [key, obj] of Object.entries(this.FisHandler_set)) {
            this.commmon_handlers = commmon_handlers;
            this.FisHandler_set[key].handlers = this.commmon_handlers;
        }
    }
    async read_handlers() {
        await readfromfilepath_1.readfromfilepath('observer', 'observerHandlerSteps', []).then((localMessages) => {
            // Fix undefine case
            if (!localMessages) {
                localMessages = [];
            }
            this.refresh_handlers(localMessages);
            return this.commmon_handlers.length;
        });
    }
    checkInitialisation() {
        if (this.FisHandler_set[this.default_tag].UCP_Id) {
            return true;
        }
        else {
            return false;
        }
    }
    perform_subcription_with_login() {
        this.get_handler_with_Tag(this.default_tag).perform_subcription_with_login(this);
    }
    start() {
        // Start subscription
        //this.perform_subcription_with_login();
    }
    getProcessingObservableInstance() {
        return this.processingObservable;
    }
}
exports.HandlersManager = HandlersManager;
/**TEST01 Obserable  */
var eventTypes;
(function (eventTypes) {
    eventTypes["Start"] = "Start";
    eventTypes["ReceiveLeaveNotification"] = "ReceiveLeaveNotification";
    eventTypes["CheckLeaveCreation"] = "CheckLeaveCreation";
    eventTypes["CheckLeaveModification"] = "CheckLeaveModification";
    eventTypes["CheckLeaveApprobation"] = "CheckLeaveApprobation";
    eventTypes["RetrieveLeave"] = "RetrieveLeave";
    eventTypes["UpdateCalendarLeave"] = "UpdateCalendarLeave";
    eventTypes["CheckCalendarLeave"] = "CheckCalendarLeave";
    eventTypes["ProcessingCompleted"] = "ProcessingCompleted";
    eventTypes["ProcessingError"] = "ProcessingError";
    eventTypes["CheckLeaveCancellation"] = "CheckLeaveCancellation";
    eventTypes["RetrieveCancelledLeave"] = "RetrieveCancelledLeave";
    eventTypes["UpdateCancelledCalenderLeave"] = "UpdateCancelledCalenderLeave";
    eventTypes["CheckCancelledCalenderLeave"] = "CheckCancelledCalenderLeave";
    //ProcessingCompleted="ProcessingCompleted",
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    eventTypes["CheckLeaveDeleted"] = "CheckLeaveDeleted";
    eventTypes["UpdateDeletedCalenderLeave"] = "UpdateDeletedCalenderLeave";
    eventTypes["CheckDeletedCalenderLeave"] = "CheckDeletedCalenderLeave";
    //ProcessingCompleted="ProcessingCompleted",
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    eventTypes["RequestLeaveDetails"] = "RequestLeaveDetails";
    eventTypes["RetrieveUpdatedLeave"] = "RetrieveUpdatedLeave";
    eventTypes["RetrievedLeaveDetails"] = "RetrievedLeaveDetails";
    eventTypes["RetrievingError"] = "RetrievingError";
    // - Registration
    //Start="Start",
    eventTypes["RegistrationFPRequested"] = "RegistrationFPRequested";
    eventTypes["RegistrationFPStarted"] = "RegistrationFPStarted";
    eventTypes["RegistrationFPInProgressRequested"] = "RegistrationFPInProgressRequested";
    eventTypes["RegistrationFPInProgress"] = "RegistrationFPInProgress";
    eventTypes["RegistrationFPCompletedRequested"] = "RegistrationFPCompletedRequested";
    eventTypes["RegistrationFPCompleted"] = "RegistrationFPCompleted";
    //ProcessingCompleted="ProcessingCompleted",
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    // - Remove Registration
    //Start="Start",
    eventTypes["RemoveRegisterPersonToFPReceived"] = "RemoveRegisterPersonToFPReceived";
    eventTypes["RemoveRegisterPersonToFPComplete"] = "RemoveRegisterPersonToFPComplete";
    // - Verify FP
    //Start="Start",
    eventTypes["NewFPReceived"] = "NewFPReceived";
    eventTypes["NewFPStored"] = "NewFPStored";
    eventTypes["RegisteredFPReceived"] = "RegisteredFPReceived";
    eventTypes["UnregisteredFPReceived"] = "UnregisteredFPReceived";
    //ProcessingCompleted="ProcessingCompleted",
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    // - Get Person Info
    //Start="Start",
    eventTypes["ReceivePersonRequested"] = "ReceivePersonRequested";
    eventTypes["LoginCompleted"] = "LoginCompleted";
    eventTypes["RetrievedPersonInfo"] = "RetrievedPersonInfo";
    eventTypes["RetrievedOrganisationInfo"] = "RetrievedOrganisationInfo";
    eventTypes["RetrievedServiceProgramData"] = "RetrievedServiceProgramData";
    eventTypes["LogoutCompleted"] = "LogoutCompleted";
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    // - Authorize FP
    eventTypes["AuthorizationRequested"] = "AuthorizationRequested";
    eventTypes["Authorization"] = "Authorization";
    eventTypes["AuthorizationComplete"] = "AuthorizationComplete";
    //ProcessingCompleted="ProcessingCompleted",
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    // - Remote Fingerprint Synchronization
    eventTypes["RemoteFingerprintSynchronizationRequested"] = "RemoteFingerprintSynchronizationRequested";
    eventTypes["RemoteFingerprintSynchronizationProcess"] = "RemoteFingerprintSynchronizationProcess";
    eventTypes["RemoteFingerprintSynchronizationComplete"] = "RemoteFingerprintSynchronizationComplete";
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    // - Synchronization Leave
    eventTypes["SynchronizationLeaveRequested"] = "SynchronizationLeaveRequested";
    eventTypes["SynchronizationNextLeaveStarted"] = "SynchronizationNextLeaveStarted";
    eventTypes["SynchronizationNextLeaveEnded"] = "SynchronizationNextLeaveEnded";
    eventTypes["SynchronizationLeaveComplete"] = "SynchronizationLeaveComplete";
    //ProcessingError="ProcessingError",
    //ConnectionError="ConnectionError",
    eventTypes["SynchronizationLeaveCompleteNotification"] = "SynchronizationLeaveCompleteNotification";
    eventTypes["ConnectionError"] = "ConnectionError";
    eventTypes["CheckLeaveState"] = "CheckLeaveState";
    eventTypes["First"] = "First";
    eventTypes["Second"] = "Second";
    eventTypes["Third"] = "Third";
})(eventTypes = exports.eventTypes || (exports.eventTypes = {}));
/**TEST01 END  */
//# sourceMappingURL=handlers_manager.js.map