"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base_notification_handler_class = void 0;
const process_parameters_1 = require(".././_interface/process_parameters");
const handlers_manager_1 = require("../handlers_manager");
const uuid_1 = require("uuid");
const observer_constants_1 = require("../observer.constants");
const rxjs_1 = require("rxjs");
const DP_config_1 = require("../_dependencies/DP/src/config/DP.config");
const export_1 = require("../_dependencies/DP/src/interface/export");
const DP_controller_1 = require("../_dependencies/DP/src/services/DP.controller");
class base_notification_handler_class {
    /**TEST PART 01 END */
    /**TEST PART 02 */
    //protected messageQueues:Record<string,MessageQueueHandlerClass>
    constructor() {
        // // Setup message queues
        // this.messageQueues = {};
        // this.messageQueues[this.channels.Notification] = notificationMessageQueueHandler;
        // this.messageQueues[this.channels.ServiceProvider] = serviceProviderMessageQueueHandler;  
        // this.messageQueues[this.channels.Request] = requestMessageQueueHandler; 
        // this.messageQueues[this.channels.Response] = responseMessageQueueHandler;  
        // this.messageQueues[this.channels.UserSessions] = userSessionsMessageQueueHandler;  
        // this.messageQueues[this.channels.ServiceProviderExt] = serviceProviderMessageQueueHandler_ext; 
        this.UUID = uuid_1.v4(); // Object uuid
        this.class_name = ""; // Assigned object class name
        this.Tag = ""; // Assigned object Tag
        this.handlers = {};
        this.UserAppId = "";
        this.remoteNotificationSubscriptions = {};
        this.localServiceProvidersList = [];
        this.instanceId = uuid_1.v4();
        this.errorSinkObservable = new rxjs_1.Subject();
        this.liveSubsription = [];
        this.restart_count = 0;
        this.app = "Test Application";
        this.dpWaitMinutes = process.env['dpWaitMinutes'];
        // Subscription channel
        this.channels = observer_constants_1.Channels;
    }
    resetLiveSubscription() {
        this.restart_count = 0;
        // Clear subscription
        this.liveSubsription.forEach((subs) => {
            subs.unsubscribe();
        });
        // Reset subscription
        this.liveSubsription = [];
    }
    getUUID() {
        return this.UUID;
    }
    getClassName() {
        return this.class_name;
    }
    maintainConnection() {
        //console.log("started maintain connection")
        // Callback
        clearTimeout(this.timeoutID);
        this.timeoutID = setTimeout(() => {
            console.log("Timeout Restarting ( not receiving message for " + this.dpWaitMinutes + " min(s) )...");
            // Start the server's subscription
            let connectionError = {
                requestId: "Start_" + new export_1.Uuid().generateId(),
                eventType: handlers_manager_1.eventTypes.ConnectionError,
                message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", "Connection Error." || "")
            };
            console.log("Maintain Connection Error!");
            this.errorSinkObservable.next(connectionError);
        }, this.dpWaitMinutes * 60000); //Set as 60s must received something
    }
    subscribeForConnectionError(inputObservable) {
        let newErrorPublisher = new rxjs_1.Subject();
        let newSub = this.errorSinkObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.ConnectionError) {
                    this.previous_UCP_Id = this.UCP_Id;
                    clearTimeout(this.timeoutID);
                    this.restart_count = 0;
                    // Create error info
                    let error = {
                        ObjectID: this.getUUID(),
                        ObjectTypeCode: this.getClassName(),
                        ErrorCode: "ConnectionDown"
                    };
                    let startMessage = {
                        requestId: process.requestId,
                        eventType: handlers_manager_1.eventTypes.Start,
                        message: this.getDomainProxy().getMessageService().getNotificationMessage("Internal", error || "Connection Error." || "")
                    };
                    console.log("General Connection Error!");
                    this.timeoutID = setTimeout(() => {
                        console.log("Restart attempted...");
                        newErrorPublisher.next(startMessage);
                    }, 6000); //60 seconds
                }
            }
        });
        // SHOULD NOTE ADD SYSTEM subscription as part of message subscription
        this.liveSubsription.push(newSub);
        return newErrorPublisher;
    }
    setLocalServiceProvidersList(provider) {
        this.localServiceProvidersList = JSON.parse(JSON.stringify(provider));
        this.localServiceProvidersList.forEach((provider) => {
            if (provider.isRoot) {
                provider.databaseSourceName = DP_config_1.URLs.NESTWS_DEFAULT_SERVER;
            }
            if ((!provider.isRoot) && provider.name == "FIS Handler") {
                provider.databaseSourceName = DP_config_1.URLs.TargetDatabase;
            }
        });
        console.log(this.localServiceProvidersList);
    }
    ;
    getLocalServiceProvidersList() {
        return this.localServiceProvidersList;
    }
    ;
    getUCPId() {
        return this.UCP_Id;
    }
    ;
    setUCPId(UCP_Id) {
        this.UCP_Id = UCP_Id;
    }
    ;
    resetUCPId() {
        this.UCP_Id = null;
        this.loginPromise = null;
    }
    ;
    async initialise(UserAppId, remoteDP, notificationManager) {
        this.UserAppId = UserAppId;
        this.MessageService = new export_1.FisCreateMessageUtility(UserAppId);
        // Setup default domains proxies  
        // Setup to use http
        const settings = {
            IdName: UserAppId,
            Description: UserAppId,
            Type: "Http",
            Target: DP_config_1.URLs.NESTWS
        };
        //this.app = UserAppId; // 2023-03-20 - fbl - Fixed missed setting
        this.DefaultDomainProxyService = new DP_controller_1.DomainProxyController();
        //this.DefaultDomainProxyService.setApplicationName(this.app);
        this.DefaultDomainProxyService.setApplicationName(UserAppId);
        this.DefaultDomainProxyService.setConnection(settings);
        this.MessageService = this.DefaultDomainProxyService.getMessageService();
        // Setup domains proxies
        // if (!this.DomainProxyServices)
        // {
        //     this.DomainProxyServices = {};
        //     this.DomainProxyServices[""] =  this.DefaultDomainProxyService;
        //     this.DomainProxyServices[this.channels.Notification] = new DomainProxyController(); 
        //     this.DomainProxyServices[this.channels.Notification].changeMessageService(DP.getMessageService());  
        //     this.DomainProxyServices[this.channels.Notification].setConnection(settings);
        //     this.DomainProxyServices[this.channels.ServiceProvider] = new DomainProxyController();
        //     this.DomainProxyServices[this.channels.ServiceProvider].changeMessageService(DP.getMessageService()); 
        //     this.DomainProxyServices[this.channels.ServiceProvider].setConnection(settings);
        //     this.DomainProxyServices[this.channels.Request] = new DomainProxyController();
        //     this.DomainProxyServices[this.channels.Request].changeMessageService(DP.getMessageService());  
        //     this.DomainProxyServices[this.channels.Request].setConnection(settings);
        //     this.DomainProxyServices[this.channels.Response] = new DomainProxyController();
        //     this.DomainProxyServices[this.channels.Response].changeMessageService(DP.getMessageService()); 
        //     this.DomainProxyServices[this.channels.Response].setConnection(settings);
        //     this.DomainProxyServices[this.channels.UserSessions] = new DomainProxyController();
        //     this.DomainProxyServices[this.channels.UserSessions].changeMessageService(DP.getMessageService());  
        //     this.DomainProxyServices[this.channels.UserSessions].setConnection(settings);
        //     this.DomainProxyServices[this.channels.ServiceProviderExt] = new DomainProxyController(); 
        //     this.DomainProxyServices[this.channels.ServiceProviderExt].changeMessageService(DP.getMessageService()); 
        //     this.DomainProxyServices[this.channels.ServiceProviderExt].setConnection({ 
        //         // Identifier Name that is Unique
        //         IdName:"Default",
        //         // Description
        //         Description:"Default connection.",
        //         // Type
        //         Type:"Http",
        //         // Type
        //         Target:URLs.NESTWS//Target:URLs.NESTWS_SITE
        //     });     
        // }
        this.notificationManager = notificationManager; // Reference to common manager
        this.loadMessagesLocalStorage();
        // console.log("Starting login..."); 
        // return this.perform_send_login_messages().then(function(UCP_ID:string){
        //     this.setUCPId(UCP_ID);
        //     console.log("Done login for "+ UCP_ID);
        //     return UCP_ID;
        // }.bind(this))
        return "0";
    }
    ;
    async add_handler(handler_id, notification_message, handler_type_name, tag) {
        this.handlers[handler_id] = process_parameters_1.generate_handler(notification_message, handler_type_name, tag);
        // console.log("BASE - add handler : ",handler_id)
        this.updateMessagesLocalStorage();
        // return this.handlers.length;
    }
    ;
    create_message(handler_ind, processname, payload) {
        let new_length = 0;
        let new_index = 0;
        // console.log("BASE - create_message : ", handler_ind)
        if (!this.handlers[handler_ind] || this.handlers[handler_ind]['steps'] === undefined) {
            console.log("triggered : ", handler_ind);
            this.handlers[handler_ind].steps = [];
        }
        this.handlers[handler_ind]['steps'].push(process_parameters_1.generate_parameters(this.MessageService, processname, payload));
        new_length = this.handlers[handler_ind].steps.length;
        new_index = new_length - 1; //assume at the last index;
        this.updateMessagesLocalStorage();
        return new_index;
    }
    ;
    updateMessagesLocalStorage(callbackhandler) {
        this.notificationManager.update_handlers(this.handlers, callbackhandler);
    }
    ;
    async loadMessagesLocalStorage() {
        return this.notificationManager.read_handlers();
    }
    ;
    async perform_handler(handler_id) {
        let status = -1;
        if (this.UCP_Id > "") {
            status = 1;
        }
        this.set_process_status(handler_id, "Done");
        this.LogMessage("Performed base handler Task ID '" + this.get_taskID(handler_id) + "'.");
        return status;
    }
    ;
    get_taskID(handler_id) {
        return this.gethandler(handler_id).task_ID;
    }
    async send_message(handler_id, steps_id, appName = this.DefaultDomainProxyService.applicationName) {
        let promise; //:Promise<ResponseMessage|FisResponseMessage>;
        for (let ind = 0; ind < this.handlers[handler_id].steps[steps_id].request.length; ind++) {
            promise = await this.DefaultDomainProxyService.sendPromise(appName, this.handlers[handler_id].steps[steps_id].request[ind]).then(returnvalue => {
                try {
                    this.handlers[handler_id].steps[steps_id].response[ind] = returnvalue;
                }
                catch (e) {
                    console.log(e);
                    console.log(this.handlers[handler_id].steps[steps_id]);
                }
                return returnvalue;
            });
        }
        return promise;
    }
    ;
    perform_send_login_messages(appName = this.DefaultDomainProxyService.applicationName, DataSource, isStream = false, target = null, serviceProviderData = {
        name: this.MessageService.getApplicationId(),
        secret: "FisSecret",
        singleton: true,
        instanceId: this.instanceId
    }) {
        let ucpId = this.getUCPId();
        // Under this logic, need set ucp to null when connection is off.
        if (ucpId > "") {
            return new Promise((resolve) => {
                resolve(ucpId);
                return ucpId;
            });
        }
        else {
            // No login in process
            if (!this.loginPromise) {
                let request = this.MessageService.getLoginMessage();
                if (DataSource) {
                    request.header.messageDestination = {
                        DataSource: DataSource
                    };
                }
                if (target) {
                    request.header.messageDataLocation.accessId = target;
                }
                if (serviceProviderData) {
                    if (!request.data) {
                        request.data = {};
                    }
                    request.data["serviceProvider"] = serviceProviderData;
                }
                this.loginPromise = this.DefaultDomainProxyService.sendPromise(appName, request).then((message) => {
                    ;
                    let ucpId = this.MessageService.getUCPId(message);
                    this.setUCPId(ucpId);
                    return ucpId;
                });
            }
            return this.loginPromise;
        }
    }
    ;
    perform_send_logout_messages(appName, UCP_Id) {
        let request = this.MessageService.getLogoutMessage(UCP_Id);
        return this.DefaultDomainProxyService.sendPromise(appName, request).then();
    }
    ;
    perform_subcription_with_login(callbackObject) {
        let responseMessage = "";
        this.perform_send_login_messages(this.DefaultDomainProxyService.applicationName, "Subscription login", true, null, null).then((UCP_ID) => {
            console.log("Base handler subcription UCP ID : " + UCP_ID);
            let msg;
            /*// Notification message queue
            this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.Notification,
              (queue:MessageInQueueInterface)=>
              {
                  let dataObject:DatabaseNotificationData;

                  if( queue.state == MessageQueueState.Start){
                      if(
                          queue.data['NotificationMicroserviceData']
                          && queue.data['NotificationMicroserviceData']['uiMessage']
                          && queue.data['NotificationMicroserviceData']['uiMessage']['NotificationData']
                          && queue.data['NotificationMicroserviceData']['uiMessage']['NotificationData']["ID"]
                          && queue.data['NotificationMicroserviceData']['uiMessage']['NotificationData']["InstanceID"]
                          && queue.data['NotificationMicroserviceData']['uiMessage']['NotificationData']["EntityTypeID"]
                          )
                      {
                          // Update status
                          queue.state = MessageQueueState.QueueForProcess;

                          // Update data
                          dataObject = queue.data['NotificationMicroserviceData']['uiMessage']['NotificationData'] as DatabaseNotificationData;

                          // Update process tag
                          queue.processTag = dataObject.Operation +" "+ dataObject.EntityTypeID
                      }
                      else{
                          queue.state = MessageQueueState.Ignored;
                      }
                  }

                  if( queue.state == MessageQueueState.QueueForProcess)
                  {
                      let newNotificationMessage:NotificationMessage;
                      const messageService:FisCreateMessageUtility = this.MessageService;

                      newNotificationMessage = messageService.getNotificationMessage(queue.message.header.security.ucpId,{DatabaseNotificationData:dataObject}, "Regenerate the database notification message.");
                      newNotificationMessage.header.messageDestination = {
                          DataSource:URLs.NESTWS_DEFAULT_SERVER
                      }
                      callbackObject.upon_notification(newNotificationMessage,
                          ()=>{ queue.state = MessageQueueState.Completed},
                          (err)=>{ console.log("Error detected.") } );

                  }
              }
            );
            
            // User sessions message queue
            this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.UserSessions,
              (queue:MessageInQueueInterface)=>
              {
                  if( queue.state == MessageQueueState.Start){
                      if(
                          queue.data['UserSessionsData']
                      )
                      {
                          queue.state = MessageQueueState.Completed;
                      }
                      else{
                          queue.state = MessageQueueState.Ignored;
                      }
                  }
              }
            );

            // Service provider message queue
            this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.ServiceProvider,
              (queue:MessageInQueueInterface)=>
              {
                  if( queue.state == MessageQueueState.Start){
                      if(
                          queue.data['ServiceProvidersData']
                      )
                      {
                          queue.state = MessageQueueState.QueueForProcess;
                          
                          const dataObject = queue.data['ServiceProvidersData'] as ServiceProvidersData;
                          this.setLocalServiceProvidersList(dataObject.providers);

                          queue.state = MessageQueueState.Completed;
                      }
                      else{
                          queue.state = MessageQueueState.Ignored;
                      }
                  }
              }
            );

            // Service provider message queue
            this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.ServiceProviderExt,
              (queue:MessageInQueueInterface)=>
              {
                  if( queue.state == MessageQueueState.Start){
                      if(
                          queue.data['ServiceProvidersData']
                      )
                      {
                          queue.state = MessageQueueState.QueueForProcess;
                          
                          const dataObject = queue.data['ServiceProvidersData'] as ServiceProvidersData;

                          queue.state = MessageQueueState.Completed;
                      }
                      else{
                          queue.state = MessageQueueState.Ignored;
                      }
                  }
              },
              null,
              null,
              this.channels.ServiceProvider
            );

            // Response message queue
            this.subscribeRemoteMessageToMessageQueue(UCP_ID,this.channels.Response,
              (queue:MessageInQueueInterface)=>
              {
                  if( queue.state == MessageQueueState.Start){
                      if(
                          queue.data['ResponseData']
                      )
                      {
                          queue.state = MessageQueueState.QueueForProcess;
                      }
                      else{
                          queue.state = MessageQueueState.Ignored;
                      }
                  }
              }
            );*/
        });
    }
    set_process_status(handler_ind, process_status) {
        this.updateMessagesLocalStorage();
        this.handlers[handler_ind].process_status = process_status;
        this.updateMessagesLocalStorage();
        return this.handlers[handler_ind];
    }
    ;
    gethandler(handler_ind) {
        return this.handlers[handler_ind];
    }
    ;
    // Upon receive notification
    // public upon_notification(notification_message: NotificationMessage, handler_type_name: string, tag: string) {
    //     // Check notification
    //     if (this.check_message(notification_message)) {
    //         // Add new handler
    //         this.add_handler(notification_message, handler_type_name, tag);
    //         // Perform action
    //         return this.run_processes()
    //     }
    // };
    check_message(newNotification) {
        let isNewNotification = true;
        for (const key in this.handlers) {
            if (this.handlers[key].notification.header.messageID == newNotification.header.messageID) {
                isNewNotification = false;
            }
        }
        return isNewNotification;
    }
    // Check status and perform handler
    // public async run_processes() {
    //     let process_count = 0;
    //     /* for(let ind= 0;ind<this.handlers.length;ind++)
    //      { 
    //          if(this.handlers[ind].process_status != 'Done' && this.handlers[ind].process_status != 'Saved')
    //          { 
    //              process_count = process_count + 1;
    //              await this.run_process(ind);
    //          }
    //      }*/
    //     await this.run_process(this.handlers.length - 1);
    //     return process_count;
    // };
    // Check status and perform handler
    run_process(handler_id) {
        // Concate to backup and remove previously generated steps
        this.handlers[handler_id].removed_steps.concat(this.handlers[handler_id].steps);
        this.handlers[handler_id].steps = [];
        return this.perform_handler(handler_id);
    }
    ;
    // Log message and error information
    LogMessage(message) {
        console.log(this.UserAppId + ": " + message);
    }
    ;
    // Find handler index
    find_handler_id(task_id) {
        let found_ind = -1;
        let count = found_ind;
        for (const key in this.handlers) {
            count = count + 1;
            if (this.handlers[key].task_ID == task_id) {
                found_ind = count;
            }
        }
        return found_ind;
    }
    /*TEST PART01 publish for processingObservable*/
    publishFor1st(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        return newOutputObservable;
    }
    trigger_test_message(testobservable) {
        let request = {
            header: {
                "messageType": export_1.AppMessageType.ResponseData,
                "messageID": "040de354-4867-491a-a312-51d978926463",
                "messageName": "Success Login",
                "dateCreated": "2022-11-03T03:53:24.027Z",
                "isAggregate": false,
                "dataSourceTiming": "",
                "serviceId": "",
                "userId": "",
                "requesterId": "Generated1207a8a8-7064-4d76-8aca-3ad0af962dd7",
                "messageProducerInformation": {
                    "origin": {
                        "userApplication": {
                            "userAppId": "ca3e5abf-0c7f-457e-beb7-805a240e8b88",
                            "userAppName": "FIS Handler"
                        }
                    },
                    "components": export_1.FisAppServerComponents.BackOfficeApplication
                },
                "security": {
                    "ucpId": "abc"
                },
                "messageDataLocation": {
                    "isEmbaded": true
                },
                "messageDataFormat": {
                    "dataFormat": export_1.DataFormat.Json,
                    "schemaType": export_1.SchemaType.JsonSchema,
                    "schema": {
                        "name": "ServerUCP"
                    }
                },
                "requestMessageRespondTo": {
                    "header": {
                        "messageType": "Request",
                        "messageID": "609fdbff-591c-494b-a847-d2fad5d6262b",
                        "messageName": "Login",
                        "dateCreated": "2021-11-10T06:40:20.443Z",
                        "isAggregate": false,
                        "messageProducerInformation": {
                            "origin": {
                                "userApplication": {
                                    "userAppId": "Observer Application",
                                    "userAppName": "client"
                                }
                            },
                            "components": "Presentation"
                        },
                        "security": {
                            "ucpId": "abc"
                        },
                        "messageDataLocation": {
                            "isEmbaded": true
                        },
                        "messageDataFormat": {
                            "dataFormat": "Json"
                        },
                        "requestExecutionMode": 0,
                        "resquestTimeOut": 0,
                        "command": "Start"
                    },
                    "data": {
                        "authenticationType": "google",
                        "email": "legit@gmail.com",
                        "timeout": 100000
                    }
                }
            },
            "data": {
                "ServerUCP": {
                    "ucpId": "7lnv883229"
                }
            }
        };
        let firstMessage = {
            requestId: request.header.messageID,
            eventType: handlers_manager_1.eventTypes.First,
            message: request
        };
        return testobservable.next(firstMessage);
    }
    subscribeForOperationA(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        console.log("subscribeForOperationA part is working");
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.First) {
                    console.log("Assume something is done here for first.");
                    let newProcess = JSON.parse(JSON.stringify(process));
                    newProcess.eventType = handlers_manager_1.eventTypes.Second;
                    newOutputObservable.next(newProcess);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForOperationB(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        console.log("subscribeForOperationB part is working");
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.Second) {
                    console.log("Assume something is done here for Second.");
                    let newProcess = JSON.parse(JSON.stringify(process));
                    newProcess.eventType = handlers_manager_1.eventTypes.Third;
                    newOutputObservable.next(newProcess);
                }
            }
        });
        return newOutputObservable;
    }
    subscribeForOperationC(inputObservable) {
        let newOutputObservable = new rxjs_1.Subject();
        console.log("subscribeForOperationC part is working");
        inputObservable.subscribe({
            next: (process) => {
                if (process.eventType == handlers_manager_1.eventTypes.Third) {
                    console.log("Assume something is done here for Third.");
                }
            }
        });
        return newOutputObservable;
    }
    checkIsCurrentObject(msg) {
        let isCurrent = true;
        // Check base message
        if (msg['data']) {
            // Check ErrorObjectInterface
            if (msg['data']['ObjectID']) {
                // Check is object ID the same?
                isCurrent = msg['data']['ObjectID'] == this.getUUID();
            }
        }
        return isCurrent;
    }
    // Subscription to message queue
    // public subscribeRemoteMessageToMessageQueue(ucpId:string,channel:string,handleNext?:(queue:MessageInQueueInterface)=>void,handleError?:(error:any)=>void,handleCompleted?:()=>void,option:string=null){
    //     // Notification message queue
    //     const msg = this.DefaultDomainProxyService.getMessageService().getSubscribeNotifMessage(ucpId,option||channel);
    //     let responseString:string;
    //     if(this.remoteNotificationSubscriptions && this.remoteNotificationSubscriptions[channel])
    //         this.remoteNotificationSubscriptions[channel].unsubscribe();
    //     console.log("Subscription started for " + channel + " ..." );   
    //     this.remoteNotificationSubscriptions[channel] = this.DefaultDomainProxyService.subscribeWithCallback("",msg,{ 
    //         next: function(x:ResponseMessage) { 
    //             console.log("Subscription received..."); 
    //             //this.messageQueues[channel].addQueue(x.header.messageID,x); 
    //             // let queue:MessageInQueueInterface = this.messageQueues[channel].getQueue(x.header.messageID);
    //             // if(queue)
    //             // {
    //             //     if(handleNext)
    //             //     {
    //             //         handleNext(queue);
    //             //     }
    //             // }
    //             responseString = "Subscription obtained '"+x.header.messageID+"'" +  " for " + channel + "." ;
    //             console.log(responseString);  
    //         }.bind(this),
    //         error: function(err) {   
    //             responseString = 'Subscription got an error: ' + JSON.stringify(err);
    //             if(handleError)
    //             {
    //                 handleError(err);
    //             }
    //             console.log(responseString);  
    //         }.bind(this),
    //         complete: function() {  
    //             responseString = 'Subscription got a complete' +  " for " + channel + "." ;
    //             if(this.remoteNotificationSubscriptions && this.remoteNotificationSubscriptions[channel])
    //                 this.remoteNotificationSubscriptions[channel].unsubscribe();
    //             if(handleCompleted)
    //             {
    //                 handleCompleted();
    //             }
    //             console.log(responseString);   
    //         }.bind(this)
    //     })
    //     return this.remoteNotificationSubscriptions[channel];
    // }
    getDomainProxy() {
        if (!this.DP) {
            this.DP = this.getDefaultDomainProxy();
        }
        return this.DP;
    }
    getDefaultDomainProxy() {
        const UCP_URL = process.env['UCP_URL'];
        const targetUrl = UCP_URL; //'http://192.168.100.59:3011'//UCP_URL; //"http://swopt.com:3011";  
        const settings = {
            IdName: this.app,
            Description: "Http login",
            Type: "Http",
            Target: targetUrl // it will auto append "/request"
        };
        this.DP = new DP_controller_1.DomainProxyController();
        this.DP.setApplicationName(this.app);
        this.DP.setConnection(settings);
        return this.DP;
    }
    // Logout 
    attemptToLogout(ucpId) {
        if (ucpId) {
            // Create message
            const msg = this.getDomainProxy().getMessageService().getLogoutMessage(ucpId);
            this.getDomainProxy().send(this.app, msg).subscribe({
                error: (err) => {
                    // Catch connection error 
                }
            });
            console.log("Attempt to log out " + ucpId);
        }
    }
    getHandlersArray() {
        let returnArray;
        for (const key in this.handlers) {
            returnArray.push(this.handlers[key]);
        }
        return returnArray;
    }
}
exports.base_notification_handler_class = base_notification_handler_class;
//# sourceMappingURL=base_notification_handler.js.map