import { base_notification_handler_class } from './base/base_notification_handler';
import { HandlerParametersInterface } from './_interface/process_parameters';
import { Subject } from 'rxjs';
import { NotificationMessage, ResponseMessage, BaseMessage } from './_dependencies/DP/src/interface/export';
import { DomainProxyController } from './_dependencies/DP/src/services/DP.controller';
import { ObserverApplication } from './observer.application';
export declare class HandlersManager {
    ApplicationName: string;
    DP: DomainProxyController;
    FisHandler_set: {
        [key: string]: base_notification_handler_class;
    };
    commmon_handlers: Record<string | number, HandlerParametersInterface>;
    default_tag: string;
    serviceId: string;
    new_employee_profile_tag: string;
    add_employee_profile_tag: string;
    modified_employee_profile_tag: string;
    applicatiton: ObserverApplication;
    protected processingObservable: Subject<unknown>;
    protected processingObservable_Modification: Subject<unknown>;
    protected processingObservable_Cancellation: Subject<unknown>;
    protected processingObservable_Deletion: Subject<unknown>;
    protected processingObservable_LeaveStatus: Subject<unknown>;
    protected processingObservable_NewApplication: Subject<unknown>;
    protected processingObservable_Approbation: Subject<unknown>;
    protected processingObservable_register_fingerprint: Subject<unknown>;
    protected processingObservable_verification_fingerprint: Subject<unknown>;
    protected processingObservable_retrieve_person_for_fingerprint: Subject<unknown>;
    protected processingObservable_RetrieveLeaveApplication: Subject<unknown>;
    protected processingObservable_authorization_fingerprint: Subject<unknown>;
    protected processingObservable_remote_fingerprint_synchronization: Subject<unknown>;
    protected processingObservable_SynchronizeLeave: Subject<unknown>;
    constructor(ApplicationName: string, DP: DomainProxyController);
    get_handler_with_Tag(tag: string): base_notification_handler_class;
    notify(msg: NotificationMessage): ResponseMessage;
    update_handlers(commmon_handlers: any, callbackhandler?: (a: string) => void): void;
    refresh_handlers(commmon_handlers: any): void;
    read_handlers(): Promise<void>;
    checkInitialisation(): boolean;
    perform_subcription_with_login(): void;
    start(): void;
    getProcessingObservableInstance(): Subject<any>;
}
/**TEST01 Obserable  */
export declare enum eventTypes {
    Start = "Start",
    ReceiveLeaveNotification = "ReceiveLeaveNotification",
    CheckLeaveCreation = "CheckLeaveCreation",
    CheckLeaveModification = "CheckLeaveModification",
    CheckLeaveApprobation = "CheckLeaveApprobation",
    RetrieveLeave = "RetrieveLeave",
    UpdateCalendarLeave = "UpdateCalendarLeave",
    CheckCalendarLeave = "CheckCalendarLeave",
    ProcessingCompleted = "ProcessingCompleted",
    ProcessingError = "ProcessingError",
    CheckLeaveCancellation = "CheckLeaveCancellation",
    RetrieveCancelledLeave = "RetrieveCancelledLeave",
    UpdateCancelledCalenderLeave = "UpdateCancelledCalenderLeave",
    CheckCancelledCalenderLeave = "CheckCancelledCalenderLeave",
    CheckLeaveDeleted = "CheckLeaveDeleted",
    UpdateDeletedCalenderLeave = "UpdateDeletedCalenderLeave",
    CheckDeletedCalenderLeave = "CheckDeletedCalenderLeave",
    RequestLeaveDetails = "RequestLeaveDetails",
    RetrieveUpdatedLeave = "RetrieveUpdatedLeave",
    RetrievedLeaveDetails = "RetrievedLeaveDetails",
    RetrievingError = "RetrievingError",
    RegistrationFPRequested = "RegistrationFPRequested",
    RegistrationFPStarted = "RegistrationFPStarted",
    RegistrationFPInProgressRequested = "RegistrationFPInProgressRequested",
    RegistrationFPInProgress = "RegistrationFPInProgress",
    RegistrationFPCompletedRequested = "RegistrationFPCompletedRequested",
    RegistrationFPCompleted = "RegistrationFPCompleted",
    RemoveRegisterPersonToFPReceived = "RemoveRegisterPersonToFPReceived",
    RemoveRegisterPersonToFPComplete = "RemoveRegisterPersonToFPComplete",
    NewFPReceived = "NewFPReceived",
    NewFPStored = "NewFPStored",
    RegisteredFPReceived = "RegisteredFPReceived",
    UnregisteredFPReceived = "UnregisteredFPReceived",
    ReceivePersonRequested = "ReceivePersonRequested",
    LoginCompleted = "LoginCompleted",
    RetrievedPersonInfo = "RetrievedPersonInfo",
    RetrievedOrganisationInfo = "RetrievedOrganisationInfo",
    RetrievedServiceProgramData = "RetrievedServiceProgramData",
    LogoutCompleted = "LogoutCompleted",
    AuthorizationRequested = "AuthorizationRequested",
    Authorization = "Authorization",
    AuthorizationComplete = "AuthorizationComplete",
    RemoteFingerprintSynchronizationRequested = "RemoteFingerprintSynchronizationRequested",
    RemoteFingerprintSynchronizationProcess = "RemoteFingerprintSynchronizationProcess",
    RemoteFingerprintSynchronizationComplete = "RemoteFingerprintSynchronizationComplete",
    SynchronizationLeaveRequested = "SynchronizationLeaveRequested",
    SynchronizationNextLeaveStarted = "SynchronizationNextLeaveStarted",
    SynchronizationNextLeaveEnded = "SynchronizationNextLeaveEnded",
    SynchronizationLeaveComplete = "SynchronizationLeaveComplete",
    SynchronizationLeaveCompleteNotification = "SynchronizationLeaveCompleteNotification",
    ConnectionError = "ConnectionError",
    CheckLeaveState = "CheckLeaveState",
    First = "First",
    Second = "Second",
    Third = "Third"
}
export interface processingObservableInterface {
    requestId: string;
    eventType: eventTypes;
    target?: string;
    message: BaseMessage | any;
}
/**TEST01 END  */
