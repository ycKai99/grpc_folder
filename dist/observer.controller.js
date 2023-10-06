"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObserverController = exports.res_render = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
const common_1 = require("@nestjs/common");
const fs = require("graceful-fs");
const jade = require("jade");
const rxjs_1 = require("rxjs");
const observer_application_1 = require("./observer.application");
const message_queue_handler_1 = require("./_queue/message.queue.handler");
const handlers_manager_1 = require("./handlers_manager");
const fingerprint_constsetting_1 = require("./_interface/fingerprint.constsetting");
const postmethod_1 = require("./fingerprint/_utility/postmethod");
const getmethod_1 = require("./fingerprint/_utility/getmethod");
const export_1 = require("./_dependencies/DP/src/interface/export");
const fingerprint_programlist_const_1 = require("./_interface/fingerprint.programlist.const");
const export_2 = require("./_dependencies/messageLog/interface/export");
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const jade = require('jade');
require('dotenv').config();
const TurnOffFingerprintApp = process.env.TurnOffFingerprintApp || '';
const loggingService = new export_2.LoggingService();
let messageData = '';
let ZKTFpService;
let defaultPersonExistingFPScans = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
];
let defaultTruePersonExistingFPScans = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
];
let fpTemplateData = [];
let ucpServerStatus = 'offline';
let statusOfSend = false;
let edgeNumber = '';
let fingerprintScore = '';
let newFingerprintScore = '';
let personIdentifier = '';
let fingerPosition = '';
let personFullData = [];
let scannedFpTemplate = '';
let fpCount;
let scannedFpTemplateObj = [];
let settingFpData;
let setFingerStatus;
let fingerDetectStatus = false;
let javaServer = process.env.JAVA_SERVER;
let lastUpload = {};
let fingerprintTemplateData;
let loginStatus = false;
let fingerprintVerificationOnlineStatus;
let witnesspersonIdentifier;
let accessibleServiceProgramData;
let accessibleOrgnData;
let userData;
let identifier = '';
function res_render(jadefile, res, jadeargument) {
    // Compile a function
    let data = fs.readFileSync('_views/' + jadefile + '.jade', {
        encoding: 'utf8',
    });
    let renderer = jade.compile(data);
    // Render the function
    let html = renderer({ jadeargument });
    return html;
}
exports.res_render = res_render;
let ObserverController = class ObserverController {
    constructor(application) {
        this.application = application;
        this.subscriptions = {};
        this.notificationSubject = new rxjs_1.Subject();
        this.FINGER_EDGE_THRESHOLD = process.env.FINGER_EDGE_THRESHOLD;
        this.FINGER_SCORE_THRESHOLD = process.env.FINGER_SCORE_THRESHOLD;
        this.FINGERPRINT_VERIFICATION_MODULE = process.env.FINGERPRINT_VERIFICATION_MODULE;
        this.ANDROID_FINGERPRINT_VERIFICATION_MODULE = process.env.ANDROID_FINGERPRINT_VERIFICATION_MODULE;
        this.sync_trigger = new rxjs_1.Subject();
        if (TurnOffFingerprintApp.toLocaleUpperCase() == 'YES') {
        }
        else {
            ZKTFpService = this.application.processManager.FisHandler_set['verification_fingerprint']['ZKTFpService'];
        }
        //check ucp server status
        try {
            getmethod_1.getAxiosMethod(process.env.UCP_URL)
                .then((response) => {
                if (String(response) === 'ETIMEDOUT' ||
                    String(response) == 'undefined') {
                    ucpServerStatus = 'offline';
                    console.log('ucp server status: ', ucpServerStatus);
                }
                else if (String(response.status) === '200') {
                    ucpServerStatus = 'online';
                    console.log('ucp server status: ', ucpServerStatus);
                }
            }).catch((err) => {
                throw err;
            });
        }
        catch (err) {
            console.log('Error: ', err);
        }
        // try {
        //   postAxiosMethod(this.FINGERPRINT_VERIFICATION_MODULE, 'checkStatus').then((response: AxiosResponse<any>) => {
        //     if (response.toString() == 'online') {
        //       fingerprintVerificationOnlineStatus = 'online';
        //       console.log('Fingerprint verification module: online');
        //     }
        //   }).catch((err) => {
        //     throw err;
        //   });
        // }
        // catch (err) {
        //   console.log('Fingerprint verification module: offline');
        // }
        //TESTING
        // let msg = new FisCreateMessageUtility("testApp").getSubscribeNotifMessage("u3anlq818","serviceprovider");
        // new HttpService().post("http://swopt.com:3011/request",msg).subscribe( {
        //     next: (x) => {
        //       console.log("This response(start1)");
        //       console.log(x);
        //       console.log("This response(end1)");
        //     },
        //     error: (err) => {
        //       console.log("error");
        //     },
        //     complete: () =>{
        //       console.log("complete");
        //     }
        //   }
        // )
        // let socket:Socket;
        // let observer:Observer<any>;
        // const observableResult:Observable<ResponseMessage> =  new Observable<any>((localObserver)=>{
        //             observer = localObserver;
        //         })
        // observableResult.subscribe(
        //           {
        //           next: (x) => {
        //             console.log("This response(start2)");
        //             console.log(x);
        //             console.log("This response(end2)");
        //           },
        //           error: (err) => {
        //             console.log("error");
        //           },
        //           complete: () =>{
        //             console.log("complete");
        //           }
        //       }
        //     )
        // socket = new io("http://swopt.com:3011", {  autoConnect:true,  auth: {},  query: {}})
        // socket.on("connect", () => {
        //   console.log("Client connected.(start2)")
        //   socket.emit('request',msg) }
        // )
        // socket.on('response', (res: any)=> {
        //     if(res.id>"") {
        //         if(!res.complete) observer.next(res);
        //         else if(res.complete) observer.complete();
        //     }
        //     else{
        //         console.log("Connection error");
        //         console.log(res);
        //     }
        // })
    }
    async startSynnchronization(body) {
        let trigger = {
            status: 1,
            message: `FIS-Observer: ${process.env.PORT} requesting sync`,
        };
        const message = this.application.DPC.getMessageService().getNotificationMessage('Perform Synchronization', { type: 'Synchronize', message: 'Requested to synchronize' });
        this.application.synchronization_start();
        this.application.get_synchronization_observerable().next(message);
    }
    test(req, response) {
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-store',
            'Access-Control-Allow-Origin': '*',
        });
        response.write('1_data');
        setTimeout(() => {
            response.write('2_data');
            setTimeout(() => {
                response.write('3_data');
                setTimeout(() => {
                    response.write('4_data');
                    setTimeout(() => {
                        response.write('5_data');
                        response.send();
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
    /*
    @Sse('sse')
    sse(): Observable<MessageEvent> {
      return interval(1000).pipe(
        map((_) => ( {
          type: 'server-time2',
          data: { hello: 'world' }
        }  as MessageEvent)),
      )
    }
    @Sse('testsse')
    testaxios1(): Observable<MessageEvent>{
      return new HttpService().get("http://localhost:4888/observer/sse",
        {responseType: 'stream'}
      ).pipe(
        map((value) => ( value.data as MessageEvent)),
      )
    }
    */
    //   @Get('testaxios')
    //   async testaxios2(){
    //     const response:any= await new HttpService().get("http://localhost:4888/observer/testsse",
    //       {responseType: 'stream'}
    //     ).pipe(
    //       (msg)=>{console.log(msg);
    //       return msg}
    //     ) .forEach(value => {
    //       console.log('new value ');
    //       console.log('observable -> ', value);
    //       console.log('new value ');
    //     });
    //  /*   const stream = response.data
    //     stream.on('data', data => {
    //       data = data.toString()
    //       console.log(data)
    //     })
    // */
    //     var es = new EventSource('http://localhost:4888/observer/testsse')
    //     es.addEventListener('server-time2', function (e:any) {
    //       console.log(e)
    //     })
    //     var es = new EventSource('http://localhost:4888/observer/sse')
    //     es.addEventListener('server-time2', function (e:any) {
    //       console.log(e)
    //     })
    //     var es2 = new EventSource('http://localhost:8080/sse')
    //     es2.addEventListener('server-time', function (e:any) {
    //       console.log(e)
    //     })
    //   }
    testreturn() {
        return 'Hello there.';
    }
    checkServerAlive() {
        return { server_status: 'SUCCESS' };
    }
    showmessage() {
        return 'Testing page for application.';
    }
    display_handlingstatus(req, response) {
        if (this.application.checkInitialisation()) {
            let jadeargument = [];
            let options_str = '';
            jadeargument['background'] = '#b0d0cb';
            if (req.body.sortoption) {
                options_str = req.body.sortoption;
            }
            else {
                options_str = 'sortbyprocesseddate';
            }
            jadeargument['sortoption'] = options_str;
            // let eventList = this.application.processManager.FisHandler_set[this.application.default_tag].handlers;
            let eventList = this.application.processManager.FisHandler_set[this.application.default_tag].getHandlersArray();
            if (options_str == 'sortbyprocesseddate') {
                eventList.sort(function (a, b) {
                    return (new Date(b.task_date).getTime() - new Date(a.task_date).getTime());
                }); // Desc date
            }
            if (options_str == 'sortbycode') {
                eventList.sort(function (a, b) {
                    let return_value = 0;
                    if (b.notification.data['Code'] > a.notification.data['Code']) {
                        return_value = 1;
                    }
                    if (b.notification.data['Code'] < a.notification.data['Code']) {
                        return_value = -1;
                    }
                    return return_value;
                }); // Dec code
            }
            jadeargument['EventList'] = eventList;
            return response
                .status(200)
                .send(res_render('handlingstatus', '', jadeargument));
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    handlingstatus(req, response) {
        if (this.application.checkInitialisation()) {
            let req_body = req['body'];
            let task_ID = req_body['task_ID'];
            if (task_ID) {
                //return this.application.run_process(task_ID).then(()=>{
                return this.display_handlingstatus(req, response);
                //})
            }
            else {
                return this.display_handlingstatus(req, response);
            }
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    display_MessageQueue(req, response) {
        return this.display_MessageQueue_Generic(req, response, message_queue_handler_1.notificationMessageQueueHandler);
    }
    display_MessageQueue0(req, response) {
        return this.display_MessageQueue_Generic(req, response, message_queue_handler_1.userSessionsMessageQueueHandler);
    }
    display_MessageQueue2(req, response) {
        return this.display_MessageQueue_Generic(req, response, message_queue_handler_1.serviceProviderMessageQueueHandler);
    }
    display_MessageQueue4(req, response) {
        return this.display_MessageQueue_Generic(req, response, message_queue_handler_1.serviceProviderMessageQueueHandler_ext);
    }
    display_MessageQueue3(req, response) {
        return this.display_MessageQueue_Generic(req, response, message_queue_handler_1.responseMessageQueueHandler);
    }
    display_MessageQueue_Generic(req, response, queueHandler) {
        if (this.application.checkInitialisation()) {
            let jadeargument = [];
            let options_str = '';
            jadeargument['background'] = '#b0d0cb';
            jadeargument['queue'] = queueHandler.queue;
            let sortKey = Object.keys(jadeargument['queue']).sort(function (a, b) {
                let return_value = 0;
                if (jadeargument['queue'][b]['date'] > jadeargument['queue'][a]['date']) {
                    return_value = 1;
                }
                if (jadeargument['queue'][b]['date'] < jadeargument['queue'][a]['date']) {
                    return_value = -1;
                }
                return return_value;
            });
            jadeargument['sortedkey'] = sortKey;
            let totalStart = 0;
            let totalIgnored = 0;
            let totalQueueForProcess = 0;
            let totalCompleted = 0;
            Object.keys(jadeargument['queue']).forEach((key) => {
                if (jadeargument['queue'][key]['state'] == message_queue_handler_1.MessageQueueState.Start) {
                    totalStart = totalStart + 1;
                }
                if (jadeargument['queue'][key]['state'] == message_queue_handler_1.MessageQueueState.Ignored) {
                    totalIgnored = totalIgnored + 1;
                }
                if (jadeargument['queue'][key]['state'] ==
                    message_queue_handler_1.MessageQueueState.QueueForProcess) {
                    totalQueueForProcess = totalQueueForProcess + 1;
                }
                if (jadeargument['queue'][key]['state'] == message_queue_handler_1.MessageQueueState.Completed) {
                    totalCompleted = totalCompleted + 1;
                }
            });
            jadeargument['headerMessage'] = ' Message State Count ';
            jadeargument['headerMessage'] += ' ( Start = ' + totalStart.toString();
            jadeargument['headerMessage'] +=
                ' ; QueueForProcess = ' + totalQueueForProcess.toString();
            jadeargument['headerMessage'] +=
                ' ; Ignored = ' + totalIgnored.toString();
            jadeargument['headerMessage'] +=
                ' ; Completed = ' + totalCompleted.toString() + ' )';
            return response
                .status(200)
                .send(res_render('messagequeue', '', jadeargument));
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    display_MessageQueueDebug(req, response) {
        if (this.application.checkInitialisation()) {
            let jadeargument = [];
            let options_str = '';
            jadeargument['background'] = '#b0d0cb';
            jadeargument['queue'] = message_queue_handler_1.notificationMessageQueueHandler.queueDebug;
            let sortKey = Object.keys(jadeargument['queue']).sort(function (a, b) {
                let return_value = 0;
                if (jadeargument['queue'][b]['date'] > jadeargument['queue'][a]['date']) {
                    return_value = 1;
                }
                if (jadeargument['queue'][b]['date'] < jadeargument['queue'][a]['date']) {
                    return_value = -1;
                }
                return return_value;
            });
            jadeargument['sortedkey'] = sortKey;
            return response
                .status(200)
                .send(res_render('messagequeue', '', jadeargument));
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    testObservableLogin2(req, response) {
        if (this.application.checkInitialisation()) {
            let responseMessage = '';
            try {
                let handler = this.application.get_handler_with_Tag('');
                handler.perform_send_login_messages().then((UCP_ID) => {
                    responseMessage = 'New UCP ID' + UCP_ID;
                    console.log(responseMessage);
                    return response.status(200).send(responseMessage);
                });
            }
            catch (e) {
                console.log(e);
                return response.status(200).send('Error' + e);
            }
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    testObservable(req, response) {
        return this.testObservableFunction(req, response, 'notification');
    }
    testObservable4(req, response) {
        return this.testObservableFunction(req, response, 'usersessions');
    }
    testObservable5(req, response) {
        return this.testObservableFunction(req, response, 'serviceprovider');
    }
    testObservable6(req, response) {
        return this.testObservableFunction(req, response, 'request');
    }
    testObservable7(req, response) {
        return this.testObservableFunction(req, response, 'response');
    }
    testObservable3(req, response) {
        if (this.application.checkInitialisation()) {
            let responseMessage = '';
            try {
                if (true) {
                    let handler = this.application.get_handler_with_Tag('');
                    handler
                        .perform_send_login_messages(this.application.processManager.ApplicationName, 'server_test', true)
                        .then((UCP_ID) => {
                        console.log('HERE GOT NEW ' + UCP_ID);
                        let msg = this.application.DPC.getMessageService().getSubscribeNotifMessage(UCP_ID, 'property_change', 'subscribe_property_change');
                        //let msg = this.application.DP.MessageService.getSubLoginMessage(UCP_ID)
                        //getsubscribeNotifMessage(UCP_ID,"property_change","subscribe_property_change");
                        if (this.subscription)
                            this.subscription.unsubscribe();
                        this.observableObject = this.application.DPC.subscribe('', msg);
                        console.log('Subscription started...');
                        this.subscription = this.observableObject.subscribe({
                            next: function (x) {
                                console.log('Subscription received...');
                                responseMessage =
                                    "HERE obtained '" + JSON.stringify(x, null, 2) + "'";
                                console.log(responseMessage);
                            },
                            error: function (err) {
                                responseMessage = 'HERE got an error: ' + err;
                                console.log(responseMessage);
                            },
                            complete: function () {
                                responseMessage = 'HERE got a complete notification';
                                console.log(responseMessage);
                            },
                        });
                    });
                }
            }
            catch (e) {
                console.log(e);
            }
            return response.status(200).send('Server running with observable.');
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    testObservableFunction(req, response, category) {
        if (this.application.checkInitialisation()) {
            let responseMessage = '';
            try {
                if (true) {
                    let handler = this.application.get_handler_with_Tag('');
                    handler
                        .perform_send_login_messages(this.application.processManager.ApplicationName, 'server_test', true)
                        .then(function (UCP_ID) {
                        console.log('HERE GOT NEW ' + UCP_ID);
                        //let msg = this.application.DP.MessageService.getsubscribeNotifMessage(UCP_ID,"property_change","subscribe_property_change");
                        let msg = this.application.DP.MessageService.getSubscribeNotifMessage(UCP_ID, category);
                        //getsubscribeNotifMessage(UCP_ID,"property_change","subscribe_property_change");
                        if (this.subscriptions && this.subscriptions[category])
                            this.subscriptions[category].unsubscribe();
                        console.log('Subscription started...');
                        this.subscriptions[category] =
                            this.application.DP.subscribeWithCallback('', msg, {
                                next: function (x) {
                                    console.log('Subscription received...');
                                    message_queue_handler_1.notificationMessageQueueHandler.addQueue(x.header.messageID, x);
                                    responseMessage =
                                        "HERE obtained '" + JSON.stringify(x, null, 2) + "'";
                                    console.log(responseMessage);
                                },
                                error: function (err) {
                                    responseMessage += 'HERE got an error: ' + err;
                                    console.log(responseMessage);
                                },
                                complete: function () {
                                    if (this.subscriptions && this.subscriptions[category])
                                        this.subscriptions[category].unsubscribe();
                                    responseMessage += 'HERE got a complete notification';
                                    console.log(responseMessage);
                                },
                            });
                    }.bind(this));
                }
            }
            catch (e) {
                console.log(e);
            }
            return response.status(200).send('Server running with observable.');
        }
        else {
            console.log('Server not yet started but received an event');
            return response.status(200).send('Server not yet started');
        }
    }
    async LeaveStatusTesting(req, response) {
        let leavestatus_data = this.application.processManager.FisHandler_set['leavestatus']['leavestatus_alldata'];
        return response.send(leavestatus_data);
    }
    LeaveStatus(req, response) {
        let leavestatus_data = this.application.processManager.FisHandler_set['leavestatus']['leavestatus_alldata'];
        let applicantName = [];
        let doc_ref_no = [];
        let applieddate = [];
        let lastupdateddate = [];
        let currentstatus = [];
        try {
            for (let i = 0; i < leavestatus_data.length; i++) {
                applicantName[i] = leavestatus_data[i]['applicantName'];
                doc_ref_no[i] = leavestatus_data[i]['doc_ref_no'];
                applieddate[i] = leavestatus_data[i]['dateApplied'];
                lastupdateddate[i] = leavestatus_data[i]['lastUpdatedDate'];
                currentstatus[i] = leavestatus_data[i]['currentStatus'];
            }
        }
        catch (e) {
            console.log(e);
        }
        let jadeargument = [];
        let test_arr = [1, 2, 3];
        jadeargument['applicantname'] = applicantName;
        jadeargument['doc_ref_no'] = doc_ref_no;
        jadeargument['applieddate'] = applieddate;
        jadeargument['lastupdateddate'] = lastupdateddate;
        jadeargument['currentstatus'] = currentstatus;
        return response.send(res_render('leavestatuspage', response, jadeargument));
    }
    async LeaveDetails(req, response) {
        let promiseToRetriveResult = new Promise((resolve) => {
            if (req.query.docrefno && req.query.ucpid) {
                let data = {
                    requestId: new export_1.Uuid().generateId(),
                    eventType: handlers_manager_1.eventTypes.RequestLeaveDetails,
                    message: req.query,
                };
                // Scheduled action
                let sub = this.application.getProcessingObservableInstance().subscribe({
                    next: (data) => {
                        if (data.eventType == handlers_manager_1.eventTypes.RetrievedLeaveDetails) {
                            sub.unsubscribe();
                            console.log('unsubscribe');
                            resolve(data);
                        }
                        if (data.eventType == handlers_manager_1.eventTypes.RetrievingError) {
                            sub.unsubscribe();
                            console.log('unsubscribe');
                            resolve(data);
                        }
                    },
                });
                // Trigger scheduled action
                this.application.getProcessingObservableInstance().next(data);
            }
            else {
                resolve('Error: request data incomplete');
            }
        });
        return response.send(await promiseToRetriveResult);
    }
    notify(req) {
        return this.application.processManager.notify(req.body);
    }
    async linktemporarypersonIdentifier(req, response) {
        let jadeargument = {};
        let temporarypersonIdentifierList = [];
        let readyToSubmit = false;
        let temporarypersonIdentifier = req.body.temporarypersonIdentifier;
        // Process Submit
        if (req.body['performedSubmit']) {
            let message = '';
            // Wait to complete (May be no need)
            // await this.linkTemporarypersonIdentifierToActual(temporarypersonIdentifier,req.body.personIdentifier)
            message += 'Registered ';
            message += temporarypersonIdentifier;
            message += ' success. ';
            //message += req.body.personIdentifier
            console.log(message);
            // Reset
            temporarypersonIdentifier = '';
            req.body.orgnFullName = '';
            req.body.personIdentifier = '';
            // Message
            jadeargument['message'] = message;
        }
        // Get other processes
        jadeargument = await this.processCheckPerson(jadeargument, req);
        // Find temp code from Fingerprint record
        for (let ind = 0; ind < fpTemplateData.length; ind++) {
            let fpTemplate = fpTemplateData[ind];
            if (fpTemplate.masterfp) {
                if (fpTemplate.personIdentifier.length > 10) {
                    let detectTempCode = fpTemplate.personIdentifier;
                    if (!temporarypersonIdentifierList.includes(detectTempCode)) {
                        temporarypersonIdentifierList.push(detectTempCode);
                    }
                }
            }
        }
        // Check if ready to submit(based on current data)
        if (temporarypersonIdentifier) {
            if (jadeargument['personIdentifier']) {
                if (temporarypersonIdentifier > '' &&
                    jadeargument['personIdentifier'] > '') {
                    readyToSubmit = true;
                }
            }
        }
        jadeargument['temporarypersonIdentifier'] = temporarypersonIdentifier || '';
        jadeargument['temporarypersonIdentifierList'] =
            temporarypersonIdentifierList;
        jadeargument['readyToSubmit'] = readyToSubmit;
        return response.send(res_render('fingerprintcheckPerson', response, jadeargument));
    }
    async serveAvatarHead(fileId, res) {
        res.sendFile(fileId, { root: '_views' });
    }
    // async linkTemporarypersonIdentifierToActual(temporarypersonIdentifier:string,actualpersonIdentifier:string){
    //   // Untested
    //   // Loop all record
    //   let fpTemplateData:fingerprintDataInterface[] = await ZKTFpService.readData(FPENTITYNAME.FP_TEMPLATE_MSG);
    //   for(let ind=0; ind<fpTemplateData.length; ind++)
    //   {
    //     let fpTemplate:fingerprintDataInterface = fpTemplateData[ind];
    //     // Find all temporarypersonIdentifier
    //     if(fpTemplate.personIdentifier==temporarypersonIdentifier)
    //     {
    //       // Construct new template data
    //       let newFpTemplate:fingerprintDataInterface = JSON.parse(JSON.stringify(fpTemplate));
    //       newFpTemplate.personIdentifier = actualpersonIdentifier // Update person code
    //       // Save each new template
    //       await ZKTFpService.updateData(FPENTITYNAME.FP_TEMPLATE_MSG, newFpTemplate)
    //     }
    //   }
    //   return;
    // }
    // // register fingerprint data
    // @Post('registerfp')
    // registerFingerprint(@Body() fingerprintData) {
    //   let data: processingObservableInterface = {
    //     requestId: new Uuid().generateId(),
    //     eventType: null,
    //     message: fingerprintData
    //   }
    //   return this.application.getProcessingObservableInstance().next(data);
    // }
    // // verification fingeprint 1 ON 1
    // @Get('fpverify')
    // async fpVerify() {
    //   return await ZKTFpService.fpVerify();
    // }
    // @Get('getfptemplate')
    // getfptemplate() {
    //   return (ZKTFpService.getFingerprintTemplateData()).length;
    // }
    // @Get('geteventmessage')
    // getEventMsg() {
    //   return (ZKTFpService.getEventMessageData()).length;
    // }
    // @Get('fptemplatesavetesting')
    // async savetesting(@Body() data) {
    //   for(let i = 0; i < 10000; i++) {
    //     let uuid = new Uuid().generateId();
    //     let message = {
    //       "uuid": uuid,
    //       "fpTemplate" : "v2pkaXJlY3Rpb25zmB36QCd5mvpAoZHu+j/V0cz6QGQf5fo/wqrR+j87mcX6P7YBB/pAc9Uc+kCH\n9bD6P+hrUfpAZV+3+j91xyz6P5Lvx/pAg0DT+kDCvsr6QBGeXPpABLaD+kB9DoX6P5Lvx/pAUpdE\n+kCtVxv6P8Kq0fo/mFts+j+2AQf6P423Dfo/VoXw+j+D42P6QIWAxvpAhrSZZmhlaWdodBkBd2pw\nb3NpdGlvbnNYmB0YQhg/GFoYhRhoGIgYbhisGMYYaBh4GKcYgBjIGFEYQRhYGKgYoBh4GDoYWhh2\nGHYYiBisGMQY4RjbanBvc2l0aW9uc1mYHRg4GM4Y4BhSGPQYfBkBSBg8GQFIGMoYuhhsGQFCGHoY\nexh2GLAYeBkBCBiDGKoZATIYyhjqGMYYRhiWGNQZAQhldHlwZXN4HUJCRUJCRUJCQkJFQkJFQkJF\nQkJCRUVFRUJFRUVFZ3ZlcnNpb254GlNvdXJjZUFGSVMgZm9yIEphdmEgMy4xNy4xZXdpZHRoGQEs\n/w==\n",
    //       "fpUuid" : "gjhqw150-asd2-1233-5745-312us248e23i",
    //       "registeredDate": new Date(),
    //       "messageType": "FPEevent",
    //       "status": "registered fingerprint",
    //       "location": "TUNJUGAH",
    //       "personIdentifier": "",
    //       "position": "1",
    //       "masterfp": false,
    //     }
    //     await ZKTFpService.addData(FPENTITYNAME.FP_TEMPLATE_MSG, message);
    //   }
    //   return true;
    // }
    // async fingerprintRegisterViewButton(req, response) {
    //   const storageController: StorageController = new StorageController();
    //   let popup = false;
    //   let sendMessage = "";
    //   const jadeargument: any = {};
    //   let result: Response = response;
    //   if(req.body['INITIALIZE_DEVICE'] || req.body['BEGIN_DEVICE'] || req.body['CLOSE_FINGERPRINT']) {
    //       sendMessage = req.body['submitValue']
    //   }
    //   if(sendMessage) {
    //     console.log('SEND MESSAGE')
    //     await postAxiosMethod("http://192.168.100.54:8080", sendMessage);
    //   }
    //   return popup
    // }
    // fpeventmessage.jade
    // handle promise to register, verification fingerprint handler
    async handlePromiseRequested(payload) {
        return await new Promise(async (resolve) => {
            let data = {
                requestId: new export_1.Uuid().generateId(),
                eventType: payload.eventTypeStart,
                message: payload.eventMessage,
            };
            // Scheduled action
            let sub = this.application.getProcessingObservableInstance().subscribe({
                next: async (data) => {
                    if (data.eventType == payload.eventTypeEnd) {
                        sub.unsubscribe();
                        await resolve(data);
                    }
                },
            });
            // Trigger scheduled action
            this.application.getProcessingObservableInstance().next(data);
        });
    }
    async fingerprintCheckPersonView(req, response) {
        let jadeargument = {};
        jadeargument['scannerID'] = this.getScannerID();
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument = await this.processCheckPerson(jadeargument, req);
        return response.send(res_render('fingerprintcheckPerson', response, jadeargument));
    }
    async processCheckPerson(jadeargument, req) {
        if (req.session.identifier && req.session.identifier !== null) {
            identifier = req.session.identifier;
        }
        else {
            identifier = '';
        }
        if (!jadeargument) {
            console.log('The jadeargument must be initialised.');
        }
        else {
            let cdmsPersonFullData = [];
            if (ucpServerStatus == 'offline') {
                statusOfSend = true;
                //Get all data from CDMS
                cdmsPersonFullData = await ZKTFpService.readData("personProfile" /* PERSON_PROF_MSG */);
                personFullData = cdmsPersonFullData;
            }
            if (ucpServerStatus == 'online') {
                // get all the person data
                let handler = this.application.processManager.FisHandler_set['retrieve_person_for_fingerprint'];
                personFullData = (await handler.getRecords(identifier).personData) || [];
                accessibleOrgnData = (await handler.getRecords(identifier).accessibleOrgnData) || [];
                accessibleServiceProgramData = (await handler.getRecords(identifier).accessibleServiceProgramData) || [];
                userData = (await handler.getRecords(identifier).userData) || [];
                if (!statusOfSend) {
                    statusOfSend = true;
                    ZKTFpService.readData("personProfile" /* PERSON_PROF_MSG */).then(async (response) => {
                        if (response.length > 0) {
                            for (let i = 0; i < response.length; i++) {
                                await ZKTFpService.deleteData("personProfile" /* PERSON_PROF_MSG */, response[i].pers_id);
                            }
                        }
                        // send the person data to CDMS when online
                        for (let i = 0; i < personFullData.length; i++) {
                            let payLoad = {
                                pers_id: personFullData[i].pers_id.toString(),
                                pers_name: personFullData[i].pers_name,
                                pers_new_ic: personFullData[i].pers_new_ic,
                                pers_sex: personFullData[i].pers_sex,
                                pers_code: personFullData[i].pers_code,
                                pers_dob: personFullData[i].pers_dob,
                                pers_race: personFullData[i].pers_race,
                                pers_religion: personFullData[i].pers_religion,
                                pers_marital: personFullData[i].pers_marital,
                                pers_nationality: personFullData[i].pers_nationality,
                                orgn_code: personFullData[i].orgn_code,
                                orgn_full_name: personFullData[i].orgn_full_name,
                                emp_id: personFullData[i].emp_id,
                                emp_employ_type: personFullData[i].emp_employ_type,
                                emp_number: personFullData[i].emp_number,
                            };
                            let personData = {
                                uuid: new export_1.Uuid().generateId(),
                                fileName: "personProfile" /* PERSON_PROF_MSG */ +
                                    '-' +
                                    new export_1.Uuid().generateId(),
                                fileType: "json" /* JSON */,
                                entityName: "personProfile" /* PERSON_PROF_MSG */,
                                fileData: payLoad,
                            };
                            try {
                                await ZKTFpService.addData("personProfile" /* PERSON_PROF_MSG */, personData);
                            }
                            catch (err) {
                                console.log('ERROR : ', err);
                            }
                        }
                    });
                }
            }
            let personFullData_filtered = [];
            // personFullData = this.application.processManager.FisHandler_set["retrieve_person_for_fingerprint"]['personData'] || [];
            fpTemplateData =
                this.application.processManager.FisHandler_set['verification_fingerprint']
                    .getFingerprintDataService()
                    .getFingerprintTemplateData() || [];
            let selectedPersonData = null;
            let personInfo = {};
            let personIdentifier;
            let orgnFullNameList = [];
            let orgnFullName = '';
            personIdentifier = req.body.personIdentifier || '';
            orgnFullName = req.body.orgnFullName || '';
            // Filtered selection
            personFullData_filtered = personFullData.filter((info) => {
                let result = true;
                if (!info.orgn_full_name || info.orgn_full_name == '') {
                    // No OU should be invalid data
                    result = false;
                }
                else {
                    if (orgnFullName > '') {
                        // Not yet perform selection no need filter
                        if (info.orgn_full_name == orgnFullName) {
                            // Filter based for same selected OU
                            result = true;
                        } // Filter based for different selected OU
                        else {
                            result = false;
                        }
                    }
                }
                return result;
            });
            // Load unique orgn names
            for (let ind = 0; ind < personFullData.length; ind++) {
                if (!orgnFullNameList.includes(personFullData[ind].orgn_full_name)) {
                    orgnFullNameList.push(personFullData[ind].orgn_full_name);
                }
            }
            // Get selected person info
            for (let ind = 0; ind < personFullData_filtered.length; ind++) {
                if (personFullData_filtered[ind].pers_code == personIdentifier) {
                    selectedPersonData = personFullData_filtered[ind];
                }
            }
            // console.log("Found employee total : "+personFullData_filtered.length)
            if (selectedPersonData) {
                orgnFullName = selectedPersonData.orgn_full_name;
                personInfo = {
                    personName: selectedPersonData.pers_name,
                    personNationality: selectedPersonData.pers_nationality,
                    personGender: '',
                    personRace: selectedPersonData.pers_race,
                    personIC: selectedPersonData.pers_new_ic,
                    personPassport: '',
                    personDOB: new Date(selectedPersonData.pers_dob).toLocaleDateString(),
                    personImagePath: '',
                    personFPScans: Array.from(defaultPersonExistingFPScans),
                };
                if (selectedPersonData.pers_sex.toLocaleUpperCase() == 'M') {
                    personInfo.personGender = 'Male';
                }
                else {
                    personInfo.personGender = 'Female';
                }
                //find out the latest image data
                let personPhotoData = await ZKTFpService.readData('personPhoto');
                if (personPhotoData.length != 0) {
                    let latestDate;
                    for (const x of personPhotoData) {
                        if (selectedPersonData.pers_code === x.personIdentifier) {
                            let imageData = await ZKTFpService.readData('genericFileData');
                            for (const y of imageData) {
                                if (x.uuid == y.uuid) {
                                    const dateCreated = new Date(y.dateCreated);
                                    if (!latestDate || dateCreated > new Date(latestDate)) {
                                        latestDate = dateCreated.toISOString();
                                    }
                                }
                            }
                        }
                    }
                    if (latestDate) {
                        let imageData = await ZKTFpService.readData('genericFileData');
                        for (const y of imageData) {
                            if (y.dateCreated === latestDate) {
                                personInfo.personImagePath = y.filedata;
                            }
                        }
                    }
                    else {
                        if (personInfo.personImagePath == '' &&
                            personInfo.personGender === 'Male') {
                            let maleImage = fs.readFileSync('./_views/male.png', 'base64');
                            personInfo.personImagePath = maleImage;
                        }
                        else {
                            let femaleImage = fs.readFileSync('./_views/female.png', 'base64');
                            personInfo.personImagePath = femaleImage;
                        }
                    }
                }
                else {
                    //Sample photo
                    if (personInfo.personImagePath == '' &&
                        personInfo.personGender === 'Male') {
                        let maleImage = fs.readFileSync('./_views/male.png', 'base64');
                        personInfo.personImagePath = maleImage;
                    }
                    else {
                        let femaleImage = fs.readFileSync('./_views/female.png', 'base64');
                        personInfo.personImagePath = femaleImage;
                    }
                }
                // Fingerprint record
                for (let ind = 0; ind < fpTemplateData.length; ind++) {
                    let fpTemplate = fpTemplateData[ind];
                    let proceed = 1;
                    // Check if belong to current person
                    if (proceed == 1) {
                        if (fpTemplate.personIdentifier == personIdentifier) {
                        }
                        else {
                            proceed = -1;
                        }
                    }
                    // Check for master fp only
                    if (proceed == 1) {
                        if (!fpTemplate.masterfp) {
                            proceed = -1;
                        }
                    }
                    // Check for master fp only
                    if (proceed == 1) {
                        if (fpTemplate.masterfp == true) {
                        }
                        else {
                            proceed = -1;
                        }
                    }
                    // Check issues with position record
                    if (proceed == 1) {
                        if (Number(fpTemplate.position) > 0) {
                        }
                        else {
                            proceed = -1;
                            console.log('There might be data error');
                        }
                    }
                    // If all okay, set the finger scan as true
                    if (proceed == 1) {
                        // Assume position 1-10 and FPScans array start from 0
                        personInfo.personFPScans[Number(fpTemplate.position) - 1] = true;
                    }
                }
            }
            // Sorting for display
            orgnFullNameList.sort(function (item_a, item_b) {
                if (item_a > item_b)
                    return 1;
                else
                    return -1;
            });
            personFullData_filtered.sort(function (item_a, item_b) {
                if (item_a.pers_name.toUpperCase() > item_b.pers_name.toUpperCase())
                    return 1;
                else
                    return -1;
            });
            jadeargument['personFullData'] = personFullData_filtered;
            jadeargument['orgnFullNameList'] = orgnFullNameList;
            jadeargument['personIdentifier'] = personIdentifier || '';
            jadeargument['orgnFullName'] = orgnFullName || '';
            jadeargument['personName'] = personInfo.personName || '';
            jadeargument['personNationality'] = personInfo.personNationality || '';
            jadeargument['personGender'] = personInfo.personGender || '';
            jadeargument['personRace'] = personInfo.personRace || '';
            jadeargument['personIC'] = personInfo.personIC || '';
            jadeargument['personPassport'] = personInfo.personPassport || '';
            jadeargument['personDOB'] = personInfo.personDOB || '';
            jadeargument['imageData'] = personInfo.personImagePath || '';
            jadeargument['retrievePersonExistingFPScans'] = personInfo.personFPScans || defaultPersonExistingFPScans;
            jadeargument['accessibleServiceProgramData'] = accessibleServiceProgramData || '';
            jadeargument['accessibleOrgnData'] = accessibleOrgnData || '';
            jadeargument['userData'] = userData || '';
        }
        return jadeargument;
    }
    // fpeventmessage page
    async fpEventMessageView(req, res) {
        fpCount = 0;
        edgeNumber = '0';
        fingerprintScore = '0';
        newFingerprintScore = '0';
        scannedFpTemplateObj = [];
        fingerprintTemplateData = '';
        // render to jade page
        let jadeargument = {};
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        jadeargument = await this.processCheckPerson(jadeargument, req);
        jadeargument['registerFingerprintAccessibleStatus'] = false;
        jadeargument['verifyFingerprintAccessible'] = false;
        jadeargument['checkPersonAccessible'] = false;
        jadeargument['uploadPhotoAccessible'] = false;
        jadeargument['paymentCollectionAccessible'] = false;
        jadeargument['authenticationLogReportAccessible'] = false;
        jadeargument['paymentCollectionReportAccessible'] = false;
        jadeargument['paymentCollectionDetailReportAccessible'] = false;
        jadeargument['securitySettingAccessible'] = false;
        // render the menu page to show the accessible program button based on the login user
        let accessibleServiceProgramDataList = jadeargument['accessibleServiceProgramData'];
        if (accessibleServiceProgramDataList.length != 0) {
            for (const x of accessibleServiceProgramDataList) {
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.ADD_FINGERPRINT && x.accessRight.create) {
                    jadeargument['registerFingerprintAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.VERIFY_FINGERPRINT && x.accessRight.create) {
                    jadeargument['verifyFingerprintAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.CHECK_PERSON && x.accessRight.create) {
                    jadeargument['checkPersonAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.UPLOAD_PHOTO && x.accessRight.create) {
                    jadeargument['uploadPhotoAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION && x.accessRight.create) {
                    jadeargument['paymentCollectionAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.AUTHENTICATION_LOG_REPORT && x.accessRight.create) {
                    jadeargument['authenticationLogReportAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION_REPORT && x.accessRight.create) {
                    jadeargument['paymentCollectionReportAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION_AUTHENTICATION_DETAIL_REPORT.substring(0, 30) && x.accessRight.create) {
                    jadeargument['paymentCollectionDetailReportAccessible'] = true;
                }
                if (x.serviceProgram.serviceId === fingerprint_programlist_const_1.ProgramDisplayList.SECURITY_SETTING && x.accessRight.create) {
                    jadeargument['securitySettingAccessible'] = true;
                    jadeargument['syncFingerprintAccessible'] = true;
                }
            }
        }
        // if (jadeargument['device_status'] === DEVICE.ACTIVE) {
        //   jadeargument['enableButton'] = true;
        // } else {
        //   jadeargument['enableButton'] = false;
        // }
        // let loginSuccessMessage = req.query.loginSuccess;
        // let message = loginSuccessMessage
        // if (message) {
        //   jadeargument['loginSuccessMessage'] = message;
        //   jadeargument['alertMessage'] = true;
        // }
        // if (loginStatus) {
        //   jadeargument['alertMessage'] = true;
        //   jadeargument['loginSuccessMessage'] = 'Login success';
        //   loginStatus = false;
        // }
        return res.send(res_render('fpeventmessage', res, jadeargument));
    }
    // fpeventmessage page
    async mainMenuPageView(req, res) {
        let returnPromise;
        if (req.body['fingerprintCheckPerson']) {
            returnPromise = res.redirect('fingerprintCheckPerson');
        }
        else if (req.body['fingerprintlinktemporarypersonIdentifier']) {
            returnPromise = res.redirect('fingerprintlinktemporarypersonIdentifier');
        }
        else if (req.body['fingerprintVerificationPage']) {
            returnPromise = res.redirect('fingerprintVerificationPage');
        }
        else if (req.body['fingerprintAuthenticationPage']) {
            returnPromise = res.redirect('fingerprintAuthenticationPage');
        }
        else if (req.body['uploadImageManagementPage']) {
            returnPromise = res.redirect('uploadImageManagementPage');
        }
        else if (req.body['accesscontrol']) {
            returnPromise = res.redirect('accesscontrol');
        }
        else if (req.body['fingerprintlogin']) {
            returnPromise = res.redirect('fingerprintlogin');
        }
        else if (req.body['paymentCollectionAuthentication']) {
            returnPromise = res.redirect('paymentCollectionAuthenticationPage');
        }
        else if (req.body['authenticationLogReport']) {
            returnPromise = res.redirect('authenticationLogReportPage');
        }
        else if (req.body['paymentCollectionReport']) {
            returnPromise = res.redirect('paymentCollectionReportPage');
        }
        else if (req.body['paymentCollectionAuthenticationDetailReport']) {
            returnPromise = res.redirect('paymentCollectionAuthenticationDetailReportPage');
        }
        else if (req.body['synchronizeFingerprint']) {
            returnPromise = res.redirect('synchronizeFingerprintPage');
        }
        else {
            returnPromise = this.fingerprintRegistrationView(res, req);
            // returnPromise = res.redirect('fingerprintRegistrationPage');
        }
        return returnPromise;
    }
    // receive new fingerprint data
    async newFingerprint(fingerprintData) {
        console.log('New fingerprint scanned');
        // send the fingerprint template data to FingerprintVerificationModule
        try {
            //for C# verify fingerprint using java server
            await postmethod_1.postAxiosMethod(process.env.FINGERPRINT_VERIFICATION_MODULE, JSON.stringify(fingerprintData)).then(async (res) => {
                let data = {
                    requestId: new export_1.Uuid().generateId(),
                    eventType: handlers_manager_1.eventTypes.Start,
                    message: res,
                };
                if (res.fpTemplate) {
                    //Count the fp scanned
                    fpCount += 1;
                    //store the fingerprint data
                    fingerprintTemplateData = {
                        fingerprintInfo: res,
                        fingerprintImageData: fingerprintData.messageData,
                    };
                    this.publishNotificationEvent({ operation: '@refresh@' });
                    edgeNumber = res.edgeNumber;
                    fingerprintScore = res.compareAllFingerprintScore;
                    personIdentifier = res.personIdentifier;
                    fingerPosition = res.fingerPosition;
                    //store the scanned fingerprint
                    let fpData = {
                        index: fpCount,
                        scannedFpTemplate: res.fpTemplate,
                    };
                    scannedFpTemplate = res.fpTemplate;
                    scannedFpTemplateObj.push(fpData);
                    fingerDetectStatus = true;
                }
                if (!res.messageType) {
                    console.log('Error verify FP');
                }
                return this.application.getProcessingObservableInstance().next(data);
            })
                .catch((err) => {
                throw err;
            });
            // for android app verify fingerprint
            // let data: processingObservableInterface = {
            //   requestId: new Uuid().generateId(),
            //   eventType: eventTypes.Start,
            //   message: fingerprintData,
            // };
            // if (fingerprintData.fpTemplate) {
            //   //Count the fp scanned
            //   fpCount += 1;
            //   //store the fingerprint data
            //   fingerprintTemplateData = {
            //     fingerprintInfo: fingerprintData,
            //     fingerprintImageData: fingerprintData.messageData
            //   };
            //   this.publishNotificationEvent({ operation: '@refresh@' });
            //   edgeNumber = fingerprintData.edgeNumber;
            //   fingerprintScore = fingerprintData.compareAllFingerprintScore;
            //   personIdentifier = fingerprintData.personIdentifier;
            //   fingerPosition = fingerprintData.fingerPosition;
            //   //store the scanned fingerprint
            //   let fpData = {
            //     index: fpCount,
            //     scannedFpTemplate: fingerprintData.fpTemplate
            //   };
            //   // scannedFpTemplate = fingerprintData.fpTemplate;
            //   // scannedFpTemplateObj.push(fpData);
            //   fingerDetectStatus = true;
            // }
            // if (!fingerprintData.messageType) {
            //   console.log('Error verify FP');
            // }
            // return this.application.getProcessingObservableInstance().next(data);
        }
        catch (err) {
            throw err;
        }
    }
    // verify fingerprint page
    async fingerprintVerificationView(req, response) {
        // Untested
        let jadeargument = {};
        let personIdentifier = '';
        let fingerposition = '';
        let temporarypersonIdentifier = null;
        let latestEventMessage;
        let latestFPData;
        console.log(req.body);
        // Check the user instructions popup status
        if (fingerprintTemplateData) {
            if (fingerprintTemplateData.fingerprintImageData.messageData) {
                jadeargument['userInstruction'] = false;
            }
        }
        else if (req.body['submitValue'] == 'closeInstruction') {
            jadeargument['userInstruction'] = false;
        }
        else {
            jadeargument['userInstruction'] = true;
        }
        // use handlePromiseRequested
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        if (fingerprintTemplateData) {
            if (fingerprintTemplateData.fingerprintImageData) {
                let payload = {
                    eventTypeStart: handlers_manager_1.eventTypes.Start,
                    eventTypeEnd: handlers_manager_1.eventTypes.ProcessingCompleted,
                    eventMessage: fingerprintTemplateData.fingerprintInfo,
                };
                await this.handlePromiseRequested(payload).then((res) => {
                    let returnMessage = res.message;
                    req.body.personIdentifier = returnMessage.fingerprintTemplateMessage.fileData.personIdentifier;
                    jadeargument['popupStatus'] = returnMessage.verificationStatus;
                    jadeargument['personIdentifier'] = returnMessage.fingerprintTemplateMessage.fileData.personIdentifier;
                    jadeargument['fingerposition'] = returnMessage.fingerprintTemplateMessage.fileData.position;
                    jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                    jadeargument['fingerprintStatus'] = returnMessage.status;
                });
            }
        }
        else {
            jadeargument['popupStatus'] = '';
            jadeargument['personIdentifier'] = '';
            jadeargument['fingerposition'] = '';
            jadeargument['messageData'] = '';
            jadeargument['fingerprintStatus'] = '';
        }
        jadeargument = await this.processCheckPerson(jadeargument, req);
        // set the popup status after multi verification if connected with HQ SERVER
        // fpStatus = await this.application.processManager.FisHandler_set['verification_fingerprint']['primaryFingerprintStatus'];
        // if (fpStatus['uuid'] && fpStatus !== undefined && currentAuthenticationStatus !== fpStatus['uuid']) {
        //   jadeargument['popupStatus'] = fpStatus;
        //   currentAuthenticationStatus = fpStatus['uuid'];
        // }
        // else {
        //   jadeargument['popupStatus'] = '';
        // }
        // if (req.method == 'GET') {
        //   fpStatus = {};
        //   jadeargument['popupStatus'] = '';
        //   let payload: handlePromiseRequestedInterface = {
        //     eventTypeStart: eventTypes.RegistrationFPRequested,
        //     eventTypeEnd: eventTypes.RegistrationFPStarted,
        //     eventMessage: 'VERIFICATION : started...',
        //   };
        //   this.handlePromiseRequested(payload);
        // }
        //Get the fingerprint image data correspond to the latest event message
        // await (this.application.processManager.FisHandler_set['verification_fingerprint'] as verification_fingerprint_class).getEventMessageData()
        //   .then(async (res) => {
        //     await (this.application.processManager.FisHandler_set['verification_fingerprint'] as verification_fingerprint_class).filteredLatestDateEventMessageData();
        //   }).then((res) => {
        //     messageData = this.application.processManager.FisHandler_set['verification_fingerprint']['messageData'];
        //   }).catch((err) => {
        //     throw new Error(`promiseToHandleRegister error : ${err}`);
        //   });
        // fpTemplateData = (this.application.processManager.FisHandler_set['verification_fingerprint'] as verification_fingerprint_class).getFingerprintDataService().getFingerprintTemplateData() || [];
        // get all event message
        // let latestAllEventMessage = await this.application.processManager.FisHandler_set['verification_fingerprint']['eventMessageData'];
        // filtered the latest event message
        // latestEventMessage = await latestAllEventMessage.sort((a, b) => +new Date(b.registeredDate) - +new Date(a.registeredDate),)[0];
        // get the latest fingerprint template data using latestEventMessage.fpuuid
        // let targetFpTemplateData = fpTemplateData.filter((x) => {
        //   if (x.fpUuid == latestEventMessage.fpUuid) {
        //     return x;
        //   }
        // });
        // latestFPData = Object.assign({}, targetFpTemplateData[0]);
        // Check is it actual or temporary person code.
        // if (latestFPData && latestFPData.personIdentifier && latestFPData.personIdentifier > '') {
        //   if (latestFPData.personIdentifier.length <= 10) {
        //     // Assume shorter one is person code
        //     personIdentifier = latestFPData.personIdentifier;
        //     fingerposition = latestFPData.position;
        //   } // Assume longer one is temporary person code
        //   else {
        //     jadeargument['temporarypersonIdentifier'] = latestFPData.personIdentifier;
        //   }
        // }
        // Set current req
        // req.body.personIdentifier = personIdentifier;
        // Person Info display
        // jadeargument = await this.processCheckPerson(jadeargument, req);
        // Header display
        // jadeargument['device_status'] = this.getDeviceStatus();
        // jadeargument['scannerID'] = this.getScannerID();
        // jadeargument['personIdentifier'] = personIdentifier;
        // jadeargument['fingerposition'] = fingerposition;
        // jadeargument['fingerprintStatus'] = latestFPData.status;
        // To Do: Add more info for display fingerprint picture(as below?)
        // jadeargument['messageData'] = messageData;
        return response.send(res_render('fingerprintVerification', response, jadeargument));
    }
    // register fingerprint page
    async fingerprintRegistrationView(res, req) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let jadeargument = {};
        let fingerCodes = Object.values(fingerprint_constsetting_1.FP_POSITION);
        let uuid = req.body['uuid'] || '';
        let fingerEdges = parseInt(edgeNumber);
        let fingerScore = parseInt(fingerprintScore);
        let dataSet = {};
        // register fingerprint from fingerprint notification
        if (req.body.operation && req.body.operation === 'new') {
            // // Send fingerprint registration notification
            // let msg2: NotificationMessage =
            //   this.application.DPC.getMessageService().getNotificationMessage(UCPId || 'abc',
            //     {
            //       FingerprintData: {
            //         'type': 'FingerprintRegistrationData',
            //         'database': {
            //           databaseName: 'FISGST',
            //         },
            //         'submitedRequest': req.body,
            //         'userData': userData,
            //         'personData': personData,
            //       },
            //     },
            //   );
            // this.application.DPC.initialise('Synchronize fingerprint application');
            // this.application.DPC.emit('Synchronize fingerprint application', msg2);
            // this.application.get_logging_observerable().next(msg2);
            // let handler: register_fingerprint_class = this.application.processManager.FisHandler_set['register_fingerprint'] as register_fingerprint_class;
            // await handler.getEventMessageData().then(async (res) => { await handler.filteredLatestDateEventMessageData(); });
            // let payload: handlePromiseRequestedInterface = {
            //   eventTypeStart: eventTypes.RegistrationFPInProgressRequested,
            //   eventTypeEnd: eventTypes.RegistrationFPInProgress,
            //   eventMessage: JSON.stringify(req.body, null, 4)
            // };
            // await this.handlePromiseRequested(payload).then(async (res) => {
            //   let errMessage = JSON.parse(res.message);
            //   if (errMessage.status === RESPONSE_STATUS.ERROR) {
            //   } else {
            //     const arrayStartIndex = errMessage.indexOf('[');
            //     const eventMessage = errMessage.substring(arrayStartIndex);
            //     jadeargument['eventMsgData'] = eventMessage;
            //   }
            // }).catch((err) => {
            //   console.log('handle promise error: ', err);
            // });
            // if (jadeargument['eventMsgData'].length > 0) {
            let payload = {
                eventTypeStart: handlers_manager_1.eventTypes.RegistrationFPCompletedRequested,
                eventTypeEnd: handlers_manager_1.eventTypes.RegistrationFPCompleted,
                eventMessage: JSON.stringify(req.body, null, 4)
            };
            await this.handlePromiseRequested(payload).then((res) => {
                let errMessage = res.message;
                if (errMessage.includes('Registered successful')) {
                    console.log('Registered successful.');
                    // await this.ZKTFpService.readFingerprintTemplateData();
                }
            }).catch((err) => {
                console.log('handle promise error: ', err);
            });
            // }
        }
        if (req.body['registerTemporaryStaff'] || req.body['registerExistingStaff']) {
            let payload = {
                eventTypeStart: handlers_manager_1.eventTypes.RegistrationFPRequested,
                eventTypeEnd: handlers_manager_1.eventTypes.RegistrationFPStarted,
                eventMessage: 'REGISTRATION : started...',
            };
            await this.handlePromiseRequested(payload);
        }
        /*
         * (verification fingerprint handler)
         * first need to get all event message
         * and then filter the latest data by date
         * get current image
         */
        await this.application.processManager.FisHandler_set['verification_fingerprint'].getEventMessageData()
            .then(async (res) => {
            await this.application.processManager.FisHandler_set['verification_fingerprint'].filteredLatestDateEventMessageData();
        })
            .then((res) => {
            messageData = this.application.processManager.FisHandler_set['verification_fingerprint']['messageData'];
        }).catch((err) => {
            throw new Error(`fingerprintRegisterView messageData error : ${err}`);
        });
        /*
         * (register fingerprint handler)
         * first need to get all event message
         * and then filter the latest data by date
         */
        await this.application.processManager.FisHandler_set['register_fingerprint'].getEventMessageData().then(async (res) => {
            await this.application.processManager.FisHandler_set['register_fingerprint'].filteredLatestDateEventMessageData();
        });
        // get eventmessage after register status
        let eventMessageDataRegStat = await this.application.processManager.FisHandler_set['register_fingerprint']['eventMessageDataRegStat'];
        // if no uuid, set default only when no person code selected.
        if (uuid == '' && !req.body['personIdentifier']) {
            if (eventMessageDataRegStat.length > 0) {
                uuid = eventMessageDataRegStat[eventMessageDataRegStat.length - 1].uuid;
            }
        }
        // Get other processes
        jadeargument = await this.processCheckPerson(jadeargument, req);
        // Pass back data
        jadeargument['uuid'] = uuid;
        jadeargument['personIdentifier'] = req.body['personIdentifier'];
        jadeargument['fingerPosition'] = req.body['fingerPosition'];
        jadeargument['eventMsgData'] = (_a = req.body['eventMsgData']) !== null && _a !== void 0 ? _a : '';
        // get latest data
        jadeargument['fingerprintData'] = JSON.parse(JSON.stringify(eventMessageDataRegStat)).reverse();
        jadeargument['messageData'] = messageData;
        // Get local data
        jadeargument['fingerCodes'] = fingerCodes;
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        jadeargument['popup'] = false;
        //show the edge number and fingerprint score
        jadeargument['edgeNumber'] = edgeNumber > this.FINGER_EDGE_THRESHOLD ? 'Good' : 'Bad';
        jadeargument['fingerprintScore'] = fingerprintScore;
        jadeargument['fingerEdgeThreshold'] = this.FINGER_EDGE_THRESHOLD;
        jadeargument['fingerScoreThreshold'] = this.FINGER_SCORE_THRESHOLD;
        // Check the user instructions popup status
        if (req.body['submitValue']) {
            jadeargument['userInstruction'] = false;
        }
        else if (!req.body['orgnFullName'] && !req.body['personIdentifier'] && !req.body['fingerPosition'] && !req.body['uuid']) {
            jadeargument['userInstruction'] = true;
        }
        else if (!req.body['orgnFullName'] && req.body['personIdentifier'] && req.body['fingerPosition'] && req.body['uuid']) {
            jadeargument['userInstruction'] = false;
        }
        // set fingerprint
        if (req.body['setFinger']) {
            dataSet = {
                uuid: req.body['uuid'],
                fingerPosition: (_b = req.body['fingerPosition']) !== null && _b !== void 0 ? _b : '',
                eventMsgData: req.body['eventMsgData'],
                personIdentifier: (_c = req.body['personIdentifier']) !== null && _c !== void 0 ? _c : '',
                orgnName: (_d = jadeargument['orgnFullName']) !== null && _d !== void 0 ? _d : '',
                fingerCodes: fingerCodes,
                fingerEdges: fingerEdges,
                fingerScore: fingerScore,
                settingFpScore: newFingerprintScore !== null && newFingerprintScore !== void 0 ? newFingerprintScore : '',
                registeredpersonIdentifier: personIdentifier,
                registeredFingerPosition: fingerPosition,
                message: '',
            };
            let payload = {
                eventTypeStart: handlers_manager_1.eventTypes.RegistrationFPInProgressRequested,
                eventTypeEnd: handlers_manager_1.eventTypes.RegistrationFPInProgress,
                eventMessage: JSON.stringify(dataSet),
            };
            await this.handlePromiseRequested(payload)
                .then(async (res) => {
                let errMessage = JSON.parse(res.message);
                if (errMessage.status === -1 /* ERROR */) {
                    jadeargument['errorPopup'] = true;
                    jadeargument['errorPopupMessage'] = errMessage.message;
                    setFingerStatus = errMessage.status;
                }
                else {
                    setFingerStatus = 1;
                    const arrayStartIndex = errMessage.indexOf('[');
                    const jsonObjectString = errMessage.substring(0, arrayStartIndex);
                    const eventMessage = errMessage.substring(arrayStartIndex);
                    const successMessage = JSON.parse(jsonObjectString);
                    jadeargument['eventMsgData'] = eventMessage;
                }
            })
                .catch((err) => {
                console.log('handle promise error: ', err);
            });
            //combine complete registration and set finger
            if (jadeargument['eventMsgData'].length > 0 && setFingerStatus == 1 /* SUCCESS */) {
                let payload = {
                    eventTypeStart: handlers_manager_1.eventTypes.RegistrationFPCompletedRequested,
                    eventTypeEnd: handlers_manager_1.eventTypes.RegistrationFPCompleted,
                    eventMessage: jadeargument['eventMsgData'],
                };
                await this.handlePromiseRequested(payload)
                    .then((res) => {
                    let errMessage = res.message;
                    let arrayStartIndex = errMessage.indexOf('[');
                    let jsonObjectString = errMessage.substring(0, arrayStartIndex);
                    let isError = JSON.parse(jsonObjectString);
                    if (isError.status === -1 /* ERROR */) {
                        jadeargument['errorPopup'] = true;
                        jadeargument['errorPopupMessage'] = isError.message;
                    }
                    else {
                        jadeargument['popup'] = true;
                    }
                }).catch((err) => {
                    console.log('handle promise error: ', err);
                });
                // send notification
                let UCPId = this.application.processManager.FisHandler_set['remote_fingerprint_synchronization']['UCP_Id'];
                console.log('sync ucp id: ', UCPId);
                let personData = personFullData.filter((item) => item.pers_code == req.body['personIdentifier']);
                let fpTemplate = await this.application.processManager.FisHandler_set['register_fingerprint']['fpTemplate'];
                let handler = this.application.processManager.FisHandler_set['register_fingerprint'];
                await handler.getEventMessageData().then(async (res) => { await handler.filteredLatestDateEventMessageData(); });
                let eventMessageDataRegStat = await this.application.processManager.FisHandler_set['register_fingerprint']['eventMessageDataRegStat'];
                let eventMessageAllData = await this.application.processManager.FisHandler_set['register_fingerprint']['eventMessageAllData'];
                let latestDateData = await eventMessageAllData.sort((a, b) => +new Date(b.registeredDate) - +new Date(a.registeredDate))[0];
                if (!eventMessageDataRegStat) {
                    eventMessageDataRegStat.push(latestDateData);
                }
                else {
                    let result = eventMessageDataRegStat.some(x => x.uuid == latestDateData.uuid);
                    if (!result) {
                        eventMessageDataRegStat.push(latestDateData);
                    }
                }
                if (latestDateData) {
                    dataSet['uuid'] = latestDateData.uuid;
                }
                // Send fingerprint registration notification
                let msg2 = this.application.DPC.getMessageService().getNotificationMessage(UCPId, {
                    FingerprintData: {
                        'type': 'FingerprintRegistrationData',
                        'database': {
                            databaseName: 'FISGST1',
                        },
                        'submitedRequest': {
                            fingerprintrawdata1: fpTemplate,
                            operation: 'new',
                            ucpId: req.session.ucpid,
                            uuid: dataSet['uuid'],
                            fingerPosition: (_e = dataSet['fingerPosition']) !== null && _e !== void 0 ? _e : '',
                            eventMsgData: jadeargument['eventMsgData'],
                            personIdentifier: (_f = dataSet['personIdentifier']) !== null && _f !== void 0 ? _f : '',
                            orgnName: (_g = dataSet['orgnName']) !== null && _g !== void 0 ? _g : '',
                            fingerCodes: dataSet['fingerCodes'],
                            fingerEdges: dataSet['fingerEdges'],
                            fingerScore: dataSet['fingerScore'],
                            settingFpScore: (_h = dataSet['settingFpScore']) !== null && _h !== void 0 ? _h : '',
                            registeredPersonCode: dataSet['registeredpersonIdentifier'],
                            registeredFingerPosition: dataSet['registeredFingerPosition'],
                        },
                        'userData': userData,
                        'personData': personData,
                    },
                });
                this.application.DPC.initialise('Synchronize fingerprint application');
                this.application.DPC.emit('Synchronize fingerprint application', msg2);
                // this.application.get_logging_observerable().next(msg2)
            }
            else {
                console.log('Registered failed...');
            }
            delete req.body['setFinger'];
            delete req.body['completeRegistration'];
            // delete req.body;
        }
        return res.send(res_render('registerfingerprintpage', res, jadeargument));
    }
    // upload image page
    async uploadImageManagementView(req, res) {
        try {
            let req_body = {};
            let jadeargument = {};
            if (!req.body.filename) {
            }
            else {
                lastUpload = req.body;
            }
            if (req.body['filedata']) {
                let dataString = req.body['filedata'].split(',')[1];
                let mimeStr = req.body['filedata'].split(',')[0].split(':')[1].split(';')[0];
                // only image file can save
                if (mimeStr.includes('image/')) {
                    req.body['filedata'] = dataString;
                    jadeargument['imageData'] = req.body['filedata'];
                    if (req.body['filename']) {
                        req_body = Object.assign({ uuid: new export_1.Uuid().generateId() }, req.body);
                        delete req_body['orgnFullName'];
                        if (req_body['personIdentifier']) {
                            let imageInfo = {
                                uuid: req_body['uuid'],
                                filename: req_body['filename'],
                                filetype: req_body['filetype'],
                                filesize: req_body['filesize'],
                                lastModified: req_body['lastModified'],
                                dateCreated: new Date(),
                                filedata: req_body['filedata'],
                            };
                            ZKTFpService.addData('genericFileData', imageInfo);
                            let payload = {
                                uuid: req_body['uuid'],
                                personIdentifier: req_body['personIdentifier'],
                                type: 'default',
                            };
                            ZKTFpService.addData('personPhoto', payload);
                            jadeargument['alertFingerprintQuality'] = true;
                            jadeargument['fingerprintQualityMessage'] = 'Upload success';
                        }
                        else {
                            jadeargument['alertFingerprintQuality'] = true;
                            jadeargument['fingerprintQualityMessage'] = 'Organisation and person name must be selected';
                        }
                    }
                }
                else {
                    jadeargument['alertFingerprintQuality'] = true;
                    jadeargument['fingerprintQualityMessage'] = 'Incorrect file type';
                }
            }
            // Update display
            jadeargument['lastUpload'] = JSON.stringify(req_body, null, 4);
            // Person Info display
            jadeargument = await this.processCheckPerson(jadeargument, req);
            jadeargument['device_status'] = this.getDeviceStatus();
            jadeargument['scannerID'] = this.getScannerID();
            return res.send(res_render('uploadimagemanagement', res, jadeargument));
        }
        catch (err) {
            console.log(err.message);
        }
    }
    // login page with fingerprint 
    async fingerprintLoginView2(req, response) {
        var _a, _b;
        let jadeargument = {};
        // Person Info display
        //jadeargument = await this.processCheckPerson(jadeargument, req);
        // Header display
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        let fingerprintLoginAccessList = await ZKTFpService.readData('fingerprintLoginAccess');
        if (fingerprintLoginAccessList.length !== 0) {
            for (const x of fingerprintLoginAccessList) {
                if (fingerprintTemplateData && fingerprintTemplateData.fingerprintImageData) {
                    jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                    jadeargument['imgBorder'] = fingerprintTemplateData.fingerprintInfo.status == 'registered fingerprint' ? 'width:300px; height:300px;border:5px solid green' : 'width:300px; height:300px;border:5px solid white';
                    if (req.body['fpLoginButton']) {
                        if (x.personIdentifier == fingerprintTemplateData.fingerprintInfo.personIdentifier) {
                            // Handler approach
                            let dataSet = {
                                selectedpersonIdentifier: (_a = x.personIdentifier) !== null && _a !== void 0 ? _a : '',
                                personIdentifier: (_b = fingerprintTemplateData.fingerprintInfo.personIdentifier) !== null && _b !== void 0 ? _b : '',
                                verificationStatus: fingerprintTemplateData.fingerprintInfo,
                                messageData: fingerprintTemplateData.fingerprintImageData,
                                currentPage: 'login',
                            };
                            let payload = {
                                eventTypeStart: handlers_manager_1.eventTypes.AuthorizationRequested,
                                eventTypeEnd: handlers_manager_1.eventTypes.AuthorizationComplete,
                                eventMessage: JSON.stringify(dataSet),
                            };
                            await this.handlePromiseRequested(payload).then((res) => {
                                let returnMessage = res.message;
                                if (returnMessage.status == -1 /* ERROR */) {
                                    jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                                    jadeargument['alertMessage'] = true;
                                    jadeargument['loginMessage'] = returnMessage.message;
                                }
                                else if (returnMessage.status == 1 /* SUCCESS */) {
                                    witnesspersonIdentifier = personIdentifier;
                                    jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                                    loginStatus = true;
                                    // return response.redirect(`fpEventMessagePage?loginSuccess=${encodeURIComponent('Login Success')}`);
                                    return response.redirect('fpEventMessagePage');
                                }
                            });
                            if (loginStatus) {
                                return;
                            }
                        }
                        else {
                            jadeargument['alertMessage'] = true;
                            jadeargument['loginMessage'] = 'Login failed';
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        else {
            if (fingerprintTemplateData && fingerprintTemplateData.fingerprintImageData) {
                jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                jadeargument['imgBorder'] = fingerprintTemplateData.fingerprintInfo.status == 'registered fingerprint' ? 'width:300px; height:300px;border:5px solid green' : 'width:300px; height:300px;border:5px solid white';
                if (req.body['fpLoginButton']) {
                    jadeargument['alertMessage'] = true;
                    jadeargument['loginMessage'] = 'You are not allowed to login with fingerprint';
                }
            }
            console.log('No data in mongodb...');
        }
        if (req.body['login']) {
            if (req.body['username'] == 'test' && req.body['password'] == 'test') {
                loginStatus = true;
                jadeargument['alertMessage'] = true;
                jadeargument['loginMessage'] = 'Login success';
                let loginSuccessMessage = 'Login success';
                // response.redirect(`fpEventMessagePage?loginSuccess=${encodeURIComponent(loginSuccessMessage)}`);
                response.redirect('fpEventMessagePage');
                return;
            }
            else {
                jadeargument['alertMessage'] = true;
                jadeargument['loginMessage'] = 'Incorrect username or password. Please try again.';
            }
        }
        response.send(res_render('fingerprintLogin', response, jadeargument));
    }
    async loginFingerprintWebComponent(req, response, session) {
        let jadeargument = {};
        // Person Info display
        jadeargument = await this.processCheckPerson(jadeargument, req);
        // Header display
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        if (req.body['login']) {
            if (req.body['username'] && req.body['password']) {
                console.log('Login user name: ', req.body['username']);
                console.log('Login user password: ', req.body['password']);
                let message = this.application.DPC.getMessageService().getLoginMessage();
                message.data = {
                    "authenticationType": "fisUser",
                    "userId": req.body['username'].toUpperCase(),
                    "userPass": req.body['password'].toUpperCase(),
                    "timeout": 5000
                };
                let observableResult = this.application.DPC.send(this.application.get_application_name(), message);
                let result = await observableResult.toPromise();
                let ucpId;
                if (result) {
                    if (result.data && result.data.ServerUCP && result.data.ServerUCP.ucpId) {
                        ucpId = result.data.ServerUCP.ucpId;
                    }
                    else {
                        console.log('Login failed...');
                    }
                }
                if (ucpId) {
                    // let postResult = await postAxiosMethod('http://localhost:4889/observer/retrieveuser', {
                    //   'UcpId': ucpId
                    // })
                    // console.log('postResult: ', postResult)
                    // return response.send(postResult);
                    return this.retrieveuser(response, {
                        'UcpId': ucpId
                    }, session);
                }
                return;
            }
            else {
                jadeargument['alertMessage'] = true;
                jadeargument['loginMessage'] = 'Incorrect username or password. Please try again.';
            }
        }
        console.log(jadeargument['loginMessage']);
        response.send(res_render('fingerprintLogin', response, jadeargument));
    }
    // fingerprint login access page
    async fingerprintLoginAccessView(req, response) {
        let jadeargument = {};
        let personIdentifier;
        let checkedValue;
        let fingerprintLoginAccessList;
        // Person Info display
        jadeargument = await this.processCheckPerson(jadeargument, req);
        // Header display
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        jadeargument['personIdentifierList'] = '';
        // let accessibleServiceProgramDataList = jadeargument['accessibleServiceProgramData'];
        let programList = [
            fingerprint_programlist_const_1.ProgramDisplayList.ADD_FINGERPRINT,
            fingerprint_programlist_const_1.ProgramDisplayList.VERIFY_FINGERPRINT,
            fingerprint_programlist_const_1.ProgramDisplayList.CHECK_PERSON,
            fingerprint_programlist_const_1.ProgramDisplayList.UPLOAD_PHOTO,
            fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION,
            fingerprint_programlist_const_1.ProgramDisplayList.AUTHENTICATION_LOG_REPORT,
            fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION_REPORT,
            fingerprint_programlist_const_1.ProgramDisplayList.PAYMENT_COLLECTION_AUTHENTICATION_DETAIL_REPORT,
            fingerprint_programlist_const_1.ProgramDisplayList.SECURITY_SETTING,
        ];
        jadeargument['accessibleServiceProgramData'] = accessibleServiceProgramData.filter((item) => programList.some((accessibleItem) => {
            if (accessibleItem.substring(0, 30) === item.serviceProgram.serviceId) {
                return item.serviceProgram.serviceId;
            }
        }));
        // for (let ind = 1; ind < jadeargument['accessibleServiceProgramData'].length; ind++) {
        //   if (jadeargument['accessibleServiceProgramData'][ind].servicePorgram) {
        //     jadeargument['accessibleServiceProgramData'][ind]['serviceProgram']['serviceId'] = jadeargument['accessibleServiceProgramData'][ind]['servicePorgram'];
        //     delete jadeargument['accessibleServiceProgramData'][ind]['servicePorgram'];
        //   }
        // }
        // fingerprintLoginAccessList = await ZKTFpService.readData("fingerprintLoginAccess");
        // let filteredFingerprintLoginAccessList = fingerprintLoginAccessList.filter(item => item.loginAccess === true);
        // let personIdentifierList = filteredFingerprintLoginAccessList.map(item => item.personIdentifier);
        // if (fingerprintLoginAccessList.length != 0 && req.body['selectedValue']) {
        //   for (const x of fingerprintLoginAccessList) {
        //     if (x.personIdentifier.includes(req.body['selectedValue'] || req.body['isChecked'])) {
        //       if (req.body['isChecked'] == 'false') {
        //         checkedValue = false;
        //       }
        //       else {
        //         checkedValue = true;
        //       }
        //       jadeargument['alertSuccess'] = true;
        //       jadeargument['alertMessage'] = 'Unauthorize success';
        //       this.publishNotificationEvent({ operation: '@refresh@' });
        //       if (x.isDeleted) {
        //         personIdentifier = req.body['selectedValue'];
        //         let payload: fingerprintLoginAccessSchema = {
        //           uuid: new Uuid().generateId(),
        //           personIdentifier: personIdentifier,
        //           loginAccess: true,
        //         };
        //         let fingerprintLoginAccessData: FileSchema = {
        //           uuid: new Uuid().generateId(),
        //           fileName: 'fingerprintLoginAccess' + '-' + new Uuid().generateId(),
        //           fileType: FILE_EXTENSION.JSON,
        //           entityName: 'fingerprintLoginAccess',
        //           fileData: payload,
        //         };
        //         jadeargument['alertSuccess'] = true;
        //         jadeargument['alertMessage'] = 'Authorize success';
        //         this.publishNotificationEvent({ operation: '@refresh@' });
        //         await ZKTFpService.addData("fingerprintLoginAccess", fingerprintLoginAccessData);
        //         console.log('add success...');
        //         break;
        //       }
        //       else {
        //         await ZKTFpService.deleteData("fingerprintLoginAccess", x.uuid);
        //         console.log('delete success...');
        //         break;
        //       }
        //     }
        //     else if (!x.personIdentifier.includes(req.body['selectedValue']) && req.body['isChecked'] == 'true') {
        //       personIdentifier = req.body['selectedValue'];
        //       let payload: fingerprintLoginAccessSchema = {
        //         uuid: new Uuid().generateId(),
        //         personIdentifier: personIdentifier,
        //         loginAccess: true,
        //       };
        //       let fingerprintLoginAccessData: FileSchema = {
        //         uuid: new Uuid().generateId(),
        //         fileName: 'fingerprintLoginAccess' + '-' + new Uuid().generateId(),
        //         fileType: FILE_EXTENSION.JSON,
        //         entityName: 'fingerprintLoginAccess',
        //         fileData: payload,
        //       };
        //       jadeargument['alertSuccess'] = true;
        //       jadeargument['alertMessage'] = 'Authorize success';
        //       this.publishNotificationEvent({ operation: '@refresh@' });
        //       await ZKTFpService.addData("fingerprintLoginAccess", fingerprintLoginAccessData);
        //       console.log('add success...');
        //       break;
        //     }
        //   };
        // }
        // else if (fingerprintLoginAccessList.length == 0 && req.body['selectedValue']) {
        //   //no data in mongodb when first time come in
        //   let payload: fingerprintLoginAccessSchema = {
        //     uuid: new Uuid().generateId(),
        //     personIdentifier: req.body['selectedValue'],
        //     loginAccess: true
        //   };
        //   let fingerprintLoginAccessData: FileSchema = {
        //     uuid: new Uuid().generateId(),
        //     fileName: 'fingerprintLoginAccess' + '-' + new Uuid().generateId(),
        //     fileType: FILE_EXTENSION.JSON,
        //     entityName: 'fingerprintLoginAccess',
        //     fileData: payload,
        //   };
        //   jadeargument['alertSuccess'] = true;
        //   jadeargument['alertMessage'] = 'Authorize success';
        //   this.publishNotificationEvent({ operation: '@refresh@' });
        //   await ZKTFpService.addData("fingerprintLoginAccess", fingerprintLoginAccessData)
        //   console.log('add success...');
        // }
        // jadeargument["personIdentifierList"] = personIdentifierList;
        return response.send(res_render('fingerprintUserAccess', response, jadeargument));
    }
    // payment collection authentication page
    async paymentCollectionAuthenticationView(req, response) {
        var _a, _b, _c;
        let jadeargument = {};
        let selectedpersonIdentifier = '';
        // Person Info display
        jadeargument = await this.processCheckPerson(jadeargument, req);
        if (req.body['personIdentifier']) {
            selectedpersonIdentifier = req.body['personIdentifier'];
        }
        // Check the user instructions popup status
        if (req.body['submitValue']) {
            jadeargument['userInstruction'] = false;
        }
        else if (!req.body['orgnFullName'] && !req.body['personIdentifier'] && !req.body['amount']) {
            jadeargument['userInstruction'] = true;
        }
        else if (!req.body['orgnFullName'] && req.body['personIdentifier'] && req.body['amount']) {
            jadeargument['userInstruction'] = false;
        }
        // authorization start when fingerprint scanned
        if (fingerprintTemplateData) {
            if (fingerprintTemplateData.fingerprintImageData) {
                let dataSet = {
                    selectedpersonIdentifier: selectedpersonIdentifier !== null && selectedpersonIdentifier !== void 0 ? selectedpersonIdentifier : '',
                    personIdentifier: (_a = fingerprintTemplateData.fingerprintInfo.personIdentifier) !== null && _a !== void 0 ? _a : '',
                    witnesspersonIdentifier: (_b = jadeargument['userData']['code']) !== null && _b !== void 0 ? _b : '',
                    verificationStatus: fingerprintTemplateData.fingerprintInfo,
                    messageData: fingerprintTemplateData.fingerprintImageData,
                    amount: (_c = req.body['amount']) !== null && _c !== void 0 ? _c : '',
                    currentPage: 'paymentCollection',
                };
                let payload = {
                    eventTypeStart: handlers_manager_1.eventTypes.AuthorizationRequested,
                    eventTypeEnd: handlers_manager_1.eventTypes.AuthorizationComplete,
                    eventMessage: JSON.stringify(dataSet),
                };
                await this.handlePromiseRequested(payload).then((res) => {
                    var _a;
                    let returnMessage = res.message;
                    if (returnMessage.status == -1 /* ERROR */ &&
                        fingerDetectStatus) {
                        //empty field error
                        jadeargument['errorPopup'] = true;
                        jadeargument['errorPopupMessage'] = returnMessage.message;
                        fingerDetectStatus = false;
                    }
                    else if (returnMessage.status == 1 /* SUCCESS */ &&
                        fingerDetectStatus) {
                        //payment collection authenticate status
                        jadeargument['popupStatus'] = JSON.parse(returnMessage.message);
                        jadeargument['messageData'] = fingerprintTemplateData.fingerprintImageData;
                        jadeargument['fingerposition'] = (_a = fingerprintTemplateData.fingerprintInfo.position) !== null && _a !== void 0 ? _a : '';
                        jadeargument['personIdentifier'] = selectedpersonIdentifier;
                    }
                });
            }
        }
        // Header display
        jadeargument['device_status'] = this.getDeviceStatus();
        jadeargument['scannerID'] = this.getScannerID();
        jadeargument['amount'] = req.body['amount'];
        jadeargument['orgn'] = req.body['orgnFullName'];
        jadeargument['person'] = req.body['personIdentifier'];
        return response.send(res_render('paymentCollectionAuthentication', response, jadeargument));
    }
    async authenticationLogReportView(req, response) {
        let jadeargument = {};
        let logEntry;
        let logArray = [];
        let primaryVerifiedStatus;
        let authenticationLog = await ZKTFpService.readData('authenticationLog');
        if (authenticationLog.length != 0) {
            // format the display of date and time
            for (const x of authenticationLog) {
                let isoDate = new Date(x['eventDate']);
                let formattedDate = isoDate.toLocaleString('en-GB', { hour12: true, });
                x['eventDate'] = formattedDate;
                let authenticationLogExtension = await ZKTFpService.readData('authenticationLogExtension', x.uuid);
                if (authenticationLogExtension.length != 0) {
                    for (const y of authenticationLogExtension) {
                        x['status'] = y.secondaryVerified ? 'Success' : 'Failed';
                        primaryVerifiedStatus = y.primaryVerified ? 'Success' : 'Failed';
                        logEntry = {
                            uuid: x.uuid,
                            fpUuid: x.fpUuid,
                            eventDate: x['eventDate'],
                            personID: x.personID,
                            machineID: x.machineID,
                            primaryVerified: primaryVerifiedStatus,
                            secondaryVerified: x['status'],
                            witness: '',
                            amount: '',
                        };
                        logArray.push(logEntry);
                    }
                }
            }
            jadeargument['authenticationLog'] = JSON.parse(JSON.stringify(logArray)).reverse();
        }
        else {
            jadeargument['authenticationLog'] = '';
        }
        return response.send(res_render('authenticationLogReport', response, jadeargument));
    }
    async paymentCollectionReportView(req, response) {
        // Initialize variables
        let jadeargument = {};
        let logEntry;
        let logArray = [];
        let primaryVerifiedStatus;
        // Read authenticationLogByPaymentCollection data
        let authenticationLogByPaymentCollectionReport = await ZKTFpService.readData('authenticationLogByPaymentCollection');
        if (authenticationLogByPaymentCollectionReport.length != 0) {
            for (const x of authenticationLogByPaymentCollectionReport) {
                // Read authenticationLog data
                let authenticationLog = await ZKTFpService.readData('authenticationLog', x['uuid']);
                if (authenticationLog[0]) {
                    // format the display of date and time
                    let isoDate = new Date(authenticationLog[0].eventDate);
                    let formattedDate = isoDate.toLocaleString('en-GB', { hour12: true, });
                    x['date'] = formattedDate;
                    x['personIdentifier'] = authenticationLog[0].personID;
                    x['machineID'] = authenticationLog[0].machineID;
                }
                // Read authenticationLogExtension data
                let authenticationLogExtension = await ZKTFpService.readData('authenticationLogExtension', x['uuid']);
                if (authenticationLogExtension[0]) {
                    if (authenticationLogExtension[0].secondaryVerified ||
                        authenticationLogExtension[0].primaryVerified) {
                        x['status'] = authenticationLogExtension[0].secondaryVerified == true ? 'Success' : 'Failed';
                        primaryVerifiedStatus = authenticationLogExtension[0].primaryVerified == true ? 'Success' : 'Failed';
                        logEntry = {
                            uuid: x.uuid,
                            fpUuid: x.fpUuid,
                            eventDate: x['date'],
                            personID: x['personIdentifier'],
                            machineID: x.machineID,
                            primaryVerified: primaryVerifiedStatus,
                            secondaryVerified: x['status'],
                            witness: x['witness'],
                            amount: x['amount'] + '.00',
                        };
                        logArray.push(logEntry);
                    }
                }
            }
            // Reverse logArray to display the latest record
            jadeargument['paymentCollectionReport'] = JSON.parse(JSON.stringify(logArray)).reverse();
        }
        else {
            jadeargument['paymentCollectionReport'] = '';
        }
        return response.send(res_render('paymentCollectionReport', response, jadeargument));
    }
    async paymentCollectionAuthenticationDetailReportView(req, response) {
        // Initialize variables
        let jadeargument = {};
        let logEntry;
        let logArray = [];
        let primaryVerifiedStatus;
        const location = process.env.LOCATION;
        // Read authenticationLogByPaymentCollection data
        let authenticationLogByPaymentCollectionReport = await ZKTFpService.readData('authenticationLogByPaymentCollection');
        if (authenticationLogByPaymentCollectionReport.length != 0) {
            for (const x of authenticationLogByPaymentCollectionReport) {
                // Read authenticationLog data
                let authenticationLog = await ZKTFpService.readData('authenticationLog', x['uuid']);
                if (authenticationLog[0]) {
                    // format the display of date and time
                    let isoDate = new Date(authenticationLog[0].eventDate);
                    let formattedDate = isoDate.toLocaleString('en-GB', { hour12: true, });
                    x['date'] = formattedDate;
                    x['personIdentifier'] = authenticationLog[0].personID;
                    x['machineID'] = authenticationLog[0].machineID;
                }
                // Read authenticationLogExtension data
                let authenticationLogExtension = await ZKTFpService.readData('authenticationLogExtension', x['uuid']);
                if (authenticationLogExtension.length != 0) {
                    x['status'] = authenticationLogExtension[0].secondaryVerified == true ? 'Success' : 'Failed';
                    primaryVerifiedStatus = authenticationLogExtension[0].primaryVerified == true ? 'Success' : 'Failed';
                    logEntry = {
                        uuid: x.uuid,
                        fpUuid: x.fpUuid,
                        eventDate: x['date'],
                        personID: x['personIdentifier'],
                        machineID: x.machineID,
                        primaryVerified: primaryVerifiedStatus,
                        secondaryVerified: x['status'],
                        witness: x['witness'],
                        amount: x['amount'] + '.00',
                    };
                    logArray.push(logEntry);
                }
            }
            // Reverse logArray to display the latest record
            jadeargument['paymentCollectionAuthenticationDetailReport'] = JSON.parse(JSON.stringify(logArray)).reverse();
        }
        else {
            jadeargument['paymentCollectionAuthenticationDetailReport'] = '';
        }
        jadeargument['location'] = location;
        return response.send(res_render('paymentCollectionAuthenticationDetailReport', response, jadeargument));
    }
    async serveAvatar(fileId, res) {
        res.sendFile(fileId, { root: '_views/fp_image' });
    }
    // app startup get fingerprint data
    async synchMissingFISEvents(body, res) {
        // test data
        /*let test:{
          "MissingFisEvents":[
            {
              "rowId":
                1,
              "rowNumber":
                1,
              "column":
              {
                "ps_doc_id":
                  7194,
                "ps_doc_leave_emp_role_id":
                  367,
                "emp_lv_mas_open":
                  "Y",
                "ps_doc_leave_ps_leave_mas_id":
                  66,
                "emp_lv_mas_year":
                  2022,
                "ps_emp_leave_master_ps_leave_id":
                  1,
                "ps_doc_header_ps_doc_ref_no":
                  "LA/2023/0000013",
                "ps_leave_profile_ps_leave_desc":
                  "Annual Leave",
                "ps_doc_header_ps_doc_status":
                  "PREPARED",
                "ps_doc_leave_ps_dt_applied":
                  "2023-04-06T15:55:58.000Z",
                "ps_doc_leave_ps_dt_from":
                  "2023-04-06T00:00:00.000Z",
                "ps_doc_leave_ps_dt_to":
                  "2023-04-06T00:00:00.000Z",
                "ps_doc_leave_ps_days":
                  1.0000
              }
            }
          ]
        }*/
        let returnJSON = {};
        if (!body) {
            returnJSON = {
                errorMessage: 'Error getting events body.',
            };
        }
        else {
            let events = null;
            events = body;
            // NOTE: THIS PART NOT WORKING PROPERLY
            // Loop to await for concurrency. (Temporary solution for concurrency fix)
            // For each event, wait till it is finished.
            let waitPromise = null;
            for (let ind = 0; ind < events.MissingFisEvents.length; ind++) {
                let currentEvent = {
                    MissingFisEvents: [events.MissingFisEvents[ind]],
                };
                let payload = {
                    eventTypeStart: handlers_manager_1.eventTypes.SynchronizationLeaveRequested,
                    eventTypeEnd: handlers_manager_1.eventTypes.SynchronizationLeaveCompleteNotification,
                    eventMessage: currentEvent,
                };
                if (!waitPromise) {
                    waitPromise = this.handlePromiseRequested(payload);
                }
                else {
                    waitPromise = waitPromise.then(async (val) => {
                        return await this.handlePromiseRequested(payload);
                    });
                }
                //newResult = await this.handlePromiseRequested(payload);
            }
            await waitPromise;
            // END NOTE: THIS PART NOT WORKING PROPERLY
            returnJSON = {
                message: 'All synchronisation handled',
            };
        }
        res.type('json');
        return res.send(returnJSON);
    }
    async verificationFPTemplate(fingerprintData) {
        let data;
        let verifyResult = {};
        try {
            // await ZKTFpService.setDeviceIP(fingerprintData.deviceIP);
            await ZKTFpService.readFingerprintTemplateData().then(async (res) => {
                let payload = {
                    command: 'HQLOADTEMPLATE',
                    fpTemplate: fingerprintData.fpTemplate.fileData,
                };
                await postmethod_1.postAxiosMethod(process.env.FINGERPRINT_VERIFICATION_MODULE, payload)
                    .then((res) => {
                    verifyResult = {
                        status: 1,
                        message: 'SUCCESS',
                        body: res,
                    };
                    data = {
                        requestId: new export_1.Uuid().generateId(),
                        eventType: handlers_manager_1.eventTypes.Start,
                        message: res,
                    };
                    this.application.getProcessingObservableInstance().next(data);
                })
                    .catch((err) => {
                    throw err;
                });
            });
        }
        catch (err) {
            verifyResult = {
                status: -1,
                message: err,
            };
        }
        return verifyResult;
        // return this.application.getProcessingObservableInstance().next(data);
    }
    // app startup get fingerprint data
    async fptemplate() {
        console.log('retrieve template...');
        return await ZKTFpService.fingerprintTemplate();
    }
    async checkFpConnection() {
        return true;
    }
    // set device status, scannerID, deviceIP
    setDeviceNo(deviceNo) {
        let newDeviceNo = deviceNo['deviceStatus'];
        if (newDeviceNo !== ZKTFpService.getDeviceStatus()) {
            ZKTFpService.setDeviceStatus(newDeviceNo);
            ZKTFpService.setScannerID(deviceNo['scannerID']);
            ZKTFpService.setDeviceIP(deviceNo['deviceIP']);
            this.publishNotificationEvent({ operation: '@refresh@' });
        }
    }
    // get device status
    getDeviceStatus() {
        return ZKTFpService.getDeviceStatus();
    }
    // get scanner ID
    getScannerID() {
        return ZKTFpService.getScannerID();
    }
    serverMessageNotification() {
        return this.notificationSubject.asObservable();
    }
    //send message to registration and verification page
    publishNotificationEvent(event) {
        const message = {
            data: event.operation || event.message,
        };
        this.notificationSubject.next(message);
    }
    /**
     * ADDED : 2023-AUG-08
     * @param req GET method
     * @param res POST method
     * @param body Extracts the entire body object from the req object
     * @param header Extracts the headers property from the req object
     * @returns return jade file
     */
    async loginWebComponent(req, response, body, header) {
        let jadeargument = [];
        const ucp_url = process.env.UCP_URL;
        jadeargument['ucp_url'] = ucp_url;
        // if app_url at header
        if (header['app_name'] && header['app_url'] && header['app_description']) {
            jadeargument['app_name'] = header['app_name'];
            jadeargument['app_url'] = header['app_url'];
            jadeargument['app_description'] = header['app_description'];
        }
        // if app_url at body
        if (req.body['app_name'] &&
            req.body['app_url'] &&
            req.body['app_description']) {
            jadeargument['app_name'] = req.body['app_name'];
            jadeargument['app_url'] = req.body['app_url'];
            jadeargument['app_description'] = req.body['app_description'];
        }
        return response.send(res_render('loginwebcomponent', response, jadeargument));
    }
    async loginFingerprintWebComponent2(req, response, body, header) {
        let jadeargument = [];
        const localhost = process.env.localhost;
        const payload = {
            app_name: 'FIS AUTHENTICATION SYSTEM',
            app_url: localhost + '/observer/retrieveuser',
            app_description: 'Please login to your FIS account to proceed to the next page.',
        };
        const ucp_url = process.env.UCP_URL;
        jadeargument['ucp_url'] = ucp_url;
        // if app_url at header
        if (header['app_name'] && header['app_url'] && header['app_description']) {
            jadeargument['app_name'] = header['app_name'];
            jadeargument['app_url'] = header['app_url'];
            jadeargument['app_description'] = header['app_description'];
        }
        // if app_url at body
        else if (req.body['app_name'] &&
            req.body['app_url'] &&
            req.body['app_description']) {
            jadeargument['app_name'] = req.body['app_name'];
            jadeargument['app_url'] = req.body['app_url'];
            jadeargument['app_description'] = req.body['app_description'];
        }
        else {
            jadeargument['app_name'] = payload['app_name'];
            jadeargument['app_url'] = payload['app_url'];
            jadeargument['app_description'] = payload['app_description'];
        }
        // if (loginStatus) {
        //   //return response.redirect(`fpEventMessagePage?loginSuccess=${encodeURIComponent('Login Success')}`);
        //   return response.redirect('fpEventMessagePage');
        // }
        // else {
        //   jadeargument['alertMessage'] = true;
        //   jadeargument['loginMessage'] = 'Login failed';
        // }
        return response.send(res_render('loginFingerprintWebComponent', response, jadeargument));
    }
    async fingerprintAuthenticationView(req, response) {
        var _a, _b;
        let jadeargument = [];
        if (req.body['closeModal']) {
            this.publishNotificationEvent({ operation: '@close@' });
        }
        //fingerprint Login
        let fingerprintLoginAccessList = await ZKTFpService.readData('fingerprintLoginAccess');
        if (fingerprintLoginAccessList.length !== 0) {
            for (const x of fingerprintLoginAccessList) {
                if (fingerprintTemplateData &&
                    fingerprintTemplateData.fingerprintImageData) {
                    jadeargument['messageData'] =
                        fingerprintTemplateData.fingerprintImageData;
                    jadeargument['imgBorder'] =
                        fingerprintTemplateData.fingerprintInfo.status ==
                            'registered fingerprint'
                            ? 'width:300px; height:300px;border:5px solid green'
                            : 'width:300px; height:300px;border:5px solid white';
                    if (req.body['fingerprintLogin']) {
                        if (x.personIdentifier ==
                            fingerprintTemplateData.fingerprintInfo.personIdentifier) {
                            // Handler approach
                            let dataSet = {
                                selectedpersonIdentifier: (_a = x.personIdentifier) !== null && _a !== void 0 ? _a : '',
                                personIdentifier: (_b = fingerprintTemplateData.fingerprintInfo.personIdentifier) !== null && _b !== void 0 ? _b : '',
                                verificationStatus: fingerprintTemplateData.fingerprintInfo,
                                messageData: fingerprintTemplateData.fingerprintImageData,
                                currentPage: 'login',
                            };
                            let payload = {
                                eventTypeStart: handlers_manager_1.eventTypes.AuthorizationRequested,
                                eventTypeEnd: handlers_manager_1.eventTypes.AuthorizationComplete,
                                eventMessage: JSON.stringify(dataSet),
                            };
                            await this.handlePromiseRequested(payload).then((res) => {
                                let returnMessage = res.message;
                                if (returnMessage.status == -1 /* ERROR */) {
                                    jadeargument['messageData'] =
                                        fingerprintTemplateData.fingerprintImageData;
                                    jadeargument['alertMessage'] = true;
                                    jadeargument['loginMessage'] = returnMessage.message;
                                }
                                else if (returnMessage.status == 1 /* SUCCESS */) {
                                    witnesspersonIdentifier = personIdentifier;
                                    jadeargument['messageData'] =
                                        fingerprintTemplateData.fingerprintImageData;
                                    loginStatus = true;
                                    this.publishNotificationEvent({ operation: '@close@' });
                                }
                            });
                            if (loginStatus) {
                                return;
                            }
                        }
                        else {
                            if (fingerprintTemplateData.fingerprintInfo.status ==
                                'unregistered fingerprint') {
                                jadeargument['alertMessage'] = true;
                                jadeargument['loginMessage'] = 'Fingerprint not registered';
                            }
                        }
                    }
                    else {
                        break;
                    }
                }
                else {
                    break;
                }
            }
        }
        else {
            if (fingerprintTemplateData &&
                fingerprintTemplateData.fingerprintImageData) {
                jadeargument['messageData'] =
                    fingerprintTemplateData.fingerprintImageData;
                jadeargument['imgBorder'] =
                    fingerprintTemplateData.fingerprintInfo.status ==
                        'registered fingerprint'
                        ? 'width:300px; height:300px;border:5px solid green'
                        : 'width:300px; height:300px;border:5px solid white';
                if (req.body['fpLoginButton']) {
                    jadeargument['alertMessage'] = true;
                    jadeargument['loginMessage'] =
                        'You are not allowed to login with fingerprint';
                }
            }
        }
        response.send(res_render('fingerprintAuthentication', response, jadeargument));
    }
    async synchronizeFingerprintPage(req, response, body) {
        let jadeargument = [];
        if (body['synchronizeFingerprint'] && body['synchronizeFingerprint'] === 'synchronizeFingerprint') {
            const message = this.application.DPC.getMessageService().getNotificationMessage('Perform Synchronization', { type: 'Synchronize', message: 'Requested to synchronize' });
            this.application.synchronization_start();
            this.application.get_synchronization_observerable().next(message);
            // this.application.sync(this.sync_trigger);
        }
        return response.send(res_render('synchronizeFingerprintPage', response, jadeargument));
    }
    async retrieveuser(response, body, session) {
        let payload = {
            eventTypeStart: handlers_manager_1.eventTypes.ReceivePersonRequested,
            eventTypeEnd: handlers_manager_1.eventTypes.ProcessingCompleted,
            eventMessage: body,
        };
        console.log('handling promise requested...');
        await this.handlePromiseRequested(payload)
            .then(async (res) => {
            session.ucpid = res.message.ucpid;
            session.identifier = res.message.identifier;
            return response.redirect('fpEventMessagePage');
        })
            .catch((err) => {
            new Error(`retrieveuser ERROR : ${err}`);
        });
    }
};
__decorate([
    common_1.Post('performSync'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "startSynnchronization", null);
__decorate([
    common_1.Get('testwrite'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "test", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testreturn", null);
__decorate([
    common_1.Get('checkserveralive'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "checkServerAlive", null);
__decorate([
    common_1.Get('testing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "showmessage", null);
__decorate([
    common_1.Get('handlingstatus'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_handlingstatus", null);
__decorate([
    common_1.Post('handlingstatus'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "handlingstatus", null);
__decorate([
    common_1.Get('notification'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue", null);
__decorate([
    common_1.Get('userSessions'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue0", null);
__decorate([
    common_1.Get('serviceProvider'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue2", null);
__decorate([
    common_1.Get('serviceProvider/site'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue4", null);
__decorate([
    common_1.Get('responses'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue3", null);
__decorate([
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, message_queue_handler_1.MessageQueueHandlerClass]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueue_Generic", null);
__decorate([
    common_1.Get('messageQueueDebug'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "display_MessageQueueDebug", null);
__decorate([
    common_1.Get('testlogin'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservableLogin2", null);
__decorate([
    common_1.Get('testobs'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable", null);
__decorate([
    common_1.Get('testsubcribeusersessions'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable4", null);
__decorate([
    common_1.Get('testsubcribeserviceprovider'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable5", null);
__decorate([
    common_1.Get('testsubcriberequest'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable6", null);
__decorate([
    common_1.Get('testsubcriberesponse'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable7", null);
__decorate([
    common_1.Get('testobs3'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservable3", null);
__decorate([
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "testObservableFunction", null);
__decorate([
    common_1.Get('leavestatustesting'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "LeaveStatusTesting", null);
__decorate([
    common_1.Get('leavestatus'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "LeaveStatus", null);
__decorate([
    common_1.Get('leavedetails'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "LeaveDetails", null);
__decorate([
    common_1.Post('notify'),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "notify", null);
__decorate([
    common_1.All('fingerprintlinktemporarypersonIdentifier'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "linktemporarypersonIdentifier", null);
__decorate([
    common_1.Get('views/:fileId'),
    __param(0, common_1.Param('fileId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "serveAvatarHead", null);
__decorate([
    common_1.All('fingerprintCheckPerson'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintCheckPersonView", null);
__decorate([
    common_1.All('fpEventMessagePage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fpEventMessageView", null);
__decorate([
    common_1.All('mainmenupage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "mainMenuPageView", null);
__decorate([
    common_1.Post('registerfingerprint'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "newFingerprint", null);
__decorate([
    common_1.All('fingerprintVerificationPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintVerificationView", null);
__decorate([
    common_1.All('fingerprintRegistrationPage'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintRegistrationView", null);
__decorate([
    common_1.All('uploadImageManagementPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "uploadImageManagementView", null);
__decorate([
    common_1.All('fingerprintlogin2'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintLoginView2", null);
__decorate([
    common_1.All('loginFingerprintWebComponent'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "loginFingerprintWebComponent", null);
__decorate([
    common_1.All('accesscontrol'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintLoginAccessView", null);
__decorate([
    common_1.All('paymentCollectionAuthenticationPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "paymentCollectionAuthenticationView", null);
__decorate([
    common_1.All('authenticationLogReportPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "authenticationLogReportView", null);
__decorate([
    common_1.All('paymentCollectionReportPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "paymentCollectionReportView", null);
__decorate([
    common_1.All('paymentCollectionAuthenticationDetailReportPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "paymentCollectionAuthenticationDetailReportView", null);
__decorate([
    common_1.Get('views/fp_image/:fileId'),
    __param(0, common_1.Param('fileId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "serveAvatar", null);
__decorate([
    common_1.Post('synchMissingFISEvents'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "synchMissingFISEvents", null);
__decorate([
    common_1.Post('verificationfptemplate'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "verificationFPTemplate", null);
__decorate([
    common_1.Get('fingerprinttemplate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fptemplate", null);
__decorate([
    common_1.All('checkfpconnection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "checkFpConnection", null);
__decorate([
    common_1.Post('setdevice'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "setDeviceNo", null);
__decorate([
    common_1.Sse('serverMessageNotification'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObserverController.prototype, "serverMessageNotification", null);
__decorate([
    common_1.All('loginwebcomponent'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __param(3, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "loginWebComponent", null);
__decorate([
    common_1.All('loginFingerprintWebComponent2'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __param(3, common_1.Headers()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "loginFingerprintWebComponent2", null);
__decorate([
    common_1.All('fingerprintAuthentication'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "fingerprintAuthenticationView", null);
__decorate([
    common_1.All('synchronizeFingerprintPage'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "synchronizeFingerprintPage", null);
__decorate([
    common_1.All('retrieveuser'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __param(2, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ObserverController.prototype, "retrieveuser", null);
ObserverController = __decorate([
    common_1.Controller('observer'),
    __metadata("design:paramtypes", [observer_application_1.ObserverApplication])
], ObserverController);
exports.ObserverController = ObserverController;
//# sourceMappingURL=observer.controller.js.map