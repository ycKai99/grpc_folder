
import {
    combineLatest,
    forkJoin,
    identity,
    merge,
    observable,
    Observable,
    Observer,
    of,
    Subject,
    Subscriber,
    Subscription,
    throwError,
  } from 'rxjs';

import {
    ExceptionType,
    FisCreateMessageUtility,
    NotificationMessage,
    RequestMessage,
    ResponseException,
    ResponseMessage,
    ResponseStatus,
    StatusException,
    StatusResponse,
    SubscriptionMessage,
  } from '../../_dependencies/FISAppMessageJSUtility/interface/export'; 
import { DomainProxyController } from '../MessageTransmission/DP.controller';

export class MessageSynchronisationClass
{ 
    messagesStatusList:MessagesStatus;
    dpc:DomainProxyController;
    appName:string;

    public setAppName(appName:string)
    {
        this.appName = appName;
    }

    public setController(dpc:DomainProxyController)
    {
        this.dpc = dpc;
    }

    public setupConsumer(ucpId,dpc?:DomainProxyController,appName?:string){
        if(dpc)
        {
            this.setController(dpc);
        }
        if(appName)
        {
            this.setAppName(appName)
        }

        if(!this.dpc){
            console.log("Error getting Domain Proxy Controller.")
        }
        else{ 
            let msg = this.dpc.getMessageService().getQueryMessage_ext(
                ucpId,
                JSON.stringify(
                    {
                        MessagesStatus:this.messagesStatusList
                    }
                ),
                "UCP");

            this.dpc.send(this.appName,msg).subscribe(
                (msg)=>{
                    this.consumer(msg);
                }
            )
        }
    }

    protected consumer(msg:ResponseMessage)
    {
        let data:MessagesStatus = msg.data['MessagesStatus']; 

        data.forEach((message:MessageStatus)=>{ 

            let ind = this.findReference(message.id);

            // New message
            if(!ind)
            {
                if(message.status == messageState.emitted)
                {
                    this.messagesStatusList.push( 
                        {
                            id:message.id,
                            status:messageState.started //restart the message transmission
                        }
                    );
                }
                else if(message.status == messageState.clear)
                {}
            }
            // Existing message
            else{ 
                if(message.status == messageState.emitted)
                {
                    if(this.messagesStatusList[ind].status == messageState.emitted)
                    {
                        this.messagesStatusList[ind].status = messageState.clear;
                    }
                } 
                else if(message.status == messageState.clear)
                {
                    this.messagesStatusList.splice(ind,1);
                }
            } 
        })
    } 
    
    public producer(msg:RequestMessage)
    {
        let data:MessagesStatus = msg.data['MessagesStatus'];

        data.forEach((message:MessageStatus)=>{ 

            let ind = this.findReference(message.id);

            // New message
            if(!ind)
            {
                if(message.status == messageState.started)
                {
                    this.messagesStatusList.push( 
                        {
                            id:message.id,
                            status:messageState.emitted //restart the message transmission
                        }
                    );
                }
                else if(message.status == messageState.clear)
                {}
            }
            // Existing message
            else{ 
                if(message.status == messageState.emitted)
                {
                    if(this.messagesStatusList[ind].status == messageState.emitted)
                    {}
                } 
                else if(message.status == messageState.clear)
                {
                    this.messagesStatusList.splice(ind,1);
                }
            } 
        })
    }

    public findReference(id)
    {
        let ind = this.messagesStatusList.findIndex(
            (msg)=>{
                return msg.id = id;
            }
        )

        return ind||null;
    }
}

export type MessageStatus = {
    id:string,
    status:messageState
}
export type MessagesStatus = MessageStatus[]

export enum messageState{
    started="started",
    emitted="emitted",
    clear="clear" 
}