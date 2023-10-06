import { Observable, Subject, Subscription } from 'rxjs';
import { ObserverApplication } from './observer.application';
import { MessageQueueHandlerClass } from './_queue/message.queue.handler';
import { Request, Response as ExpressResponse } from 'express';
import { DEVICE } from './_interface/fingerprint.constsetting';
import { ResponseMessage } from './_dependencies/DP/src/interface/export';
export declare function res_render(jadefile: any, res: any, jadeargument: any): string;
export declare class ObserverController {
    private application;
    observableObject: Observable<any>;
    subscription: Subscription;
    subscriptions: Record<string, Subscription>;
    notificationSubject: Subject<any>;
    private FINGER_EDGE_THRESHOLD;
    private FINGER_SCORE_THRESHOLD;
    private FINGERPRINT_VERIFICATION_MODULE;
    private ANDROID_FINGERPRINT_VERIFICATION_MODULE;
    private sync_trigger;
    constructor(application: ObserverApplication);
    startSynnchronization(body: any): Promise<void>;
    test(req: any, response: ExpressResponse): void;
    testreturn(): string;
    checkServerAlive(): {
        server_status: string;
    };
    showmessage(): string;
    display_handlingstatus(req: any, response: any): any;
    handlingstatus(req: any, response: any): any;
    display_MessageQueue(req: any, response: any): any;
    display_MessageQueue0(req: any, response: any): any;
    display_MessageQueue2(req: any, response: any): any;
    display_MessageQueue4(req: any, response: any): any;
    display_MessageQueue3(req: any, response: any): any;
    display_MessageQueue_Generic(req: any, response: any, queueHandler: MessageQueueHandlerClass): any;
    display_MessageQueueDebug(req: any, response: any): any;
    testObservableLogin2(req: any, response: any): any;
    testObservable(req: any, response: any): any;
    testObservable4(req: any, response: any): any;
    testObservable5(req: any, response: any): any;
    testObservable6(req: any, response: any): any;
    testObservable7(req: any, response: any): any;
    testObservable3(req: any, response: any): any;
    testObservableFunction(req: any, response: any, category: string): any;
    LeaveStatusTesting(req: any, response: any): Promise<any>;
    LeaveStatus(req: any, response: any): any;
    LeaveDetails(req: any, response: any): Promise<any>;
    notify(req: any): ResponseMessage;
    linktemporarypersonIdentifier(req: any, response: any): Promise<any>;
    serveAvatarHead(fileId: any, res: any): Promise<any>;
    handlePromiseRequested(payload: any): Promise<any | unknown>;
    fingerprintCheckPersonView(req: any, response: any): Promise<any>;
    processCheckPerson(jadeargument: any, req: any): Promise<any>;
    fpEventMessageView(req: Request, res: any): Promise<any>;
    mainMenuPageView(req: Request, res: any): Promise<any>;
    newFingerprint(fingerprintData: any): Promise<void>;
    fingerprintVerificationView(req: any, response: any): Promise<any>;
    fingerprintRegistrationView(res: any, req: any): Promise<any>;
    uploadImageManagementView(req: any, res: any): Promise<any>;
    fingerprintLoginView2(req: any, response: any): Promise<void>;
    loginFingerprintWebComponent(req: any, response: any, session: Record<string, any>): Promise<void>;
    fingerprintLoginAccessView(req: any, response: any): Promise<any>;
    paymentCollectionAuthenticationView(req: any, response: any): Promise<any>;
    authenticationLogReportView(req: any, response: any): Promise<any>;
    paymentCollectionReportView(req: any, response: any): Promise<any>;
    paymentCollectionAuthenticationDetailReportView(req: any, response: any): Promise<any>;
    serveAvatar(fileId: any, res: any): Promise<any>;
    synchMissingFISEvents(body: any, res: any): Promise<any>;
    verificationFPTemplate(fingerprintData: any): Promise<{}>;
    fptemplate(): Promise<string>;
    checkFpConnection(): Promise<boolean>;
    setDeviceNo(deviceNo: any): void;
    getDeviceStatus(): DEVICE;
    getScannerID(): string;
    serverMessageNotification(): Observable<any>;
    publishNotificationEvent(event: any): void;
    /**
     * ADDED : 2023-AUG-08
     * @param req GET method
     * @param res POST method
     * @param body Extracts the entire body object from the req object
     * @param header Extracts the headers property from the req object
     * @returns return jade file
     */
    loginWebComponent(req: any, response: any, body: any, header: any): Promise<any>;
    loginFingerprintWebComponent2(req: any, response: any, body: any, header: any): Promise<any>;
    fingerprintAuthenticationView(req: any, response: any): Promise<void>;
    synchronizeFingerprintPage(req: any, response: any, body: any): Promise<any>;
    retrieveuser(response: any, body: any, session: Record<string, any>): Promise<void>;
}
