// import { AppMessageCreator, AppMessageType, Command, CommandMessageParameter, ProducerType, FisAppMessage as FisAppRequestMessage, } from "src/interface/export";

import { AppMessageCreator, AppMessageType, Command, CommandMessageParameter, ProducerType, FisAppMessage as FisAppRequestMessage, } from "../_interfaces/export";



console.log(`Hey there`)


function getLoginMessage() {
    return AppMessageCreator.create({
        // ucpId is compulsory for all messages but for login cmd it can be anything
        security: { ucpId: 'abc' },
        producer: {
            type: ProducerType.UI,
            origin: {
                userApplication: { // property values are flexible for now
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: AppMessageType.Command,
        messageName: "Login", // Short description
        command: Command.Start,
        data: { // at the moment only this credential will work
            authenticationType: 'google',
            email: 'legit@gmail.com',
            timeout: 10
        },
    } as CommandMessageParameter) as FisAppRequestMessage;
}

function getSocialLoginMessage(email: string) {
    return AppMessageCreator.create({
        // ucpId is compulsory for all messages but for login cmd it can be anything
        security: { ucpId: 'abc' },
        producer: {
            type: ProducerType.UI,
            origin: {
                userApplication: { // property values are flexible for now
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: AppMessageType.Command,
        messageName: "Login", // Short description
        command: Command.Start,
        data: { // at the moment only this credential will work
            authenticationType: 'registeredEmail',
            email: email.toLowerCase(),
            timeout: 10
        },
    } as CommandMessageParameter) as FisAppRequestMessage;
}

function getLogoutMessage(ucpId: string) {
    return AppMessageCreator.create({
        security: { ucpId },
        producer: {
            type: ProducerType.UI,
            origin: {
                userApplication: {
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: AppMessageType.Command,
        messageName: "Logout", // Short description of this message.
        command: Command.Logout,
        data: {},
    } as CommandMessageParameter) as FisAppRequestMessage;
}

let ucpId = "Logging out now"
let login = getLoginMessage()
let logout = getLogoutMessage(ucpId)
console.log(login)
console.log(logout)