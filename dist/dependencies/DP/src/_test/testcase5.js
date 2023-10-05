"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const export_1 = require("../_interfaces/export");
console.log(`Hey there`);
function getLoginMessage() {
    return export_1.AppMessageCreator.create({
        security: { ucpId: 'abc' },
        producer: {
            type: export_1.ProducerType.UI,
            origin: {
                userApplication: {
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: export_1.AppMessageType.Command,
        messageName: "Login",
        command: export_1.Command.Start,
        data: {
            authenticationType: 'google',
            email: 'legit@gmail.com',
            timeout: 10
        },
    });
}
function getSocialLoginMessage(email) {
    return export_1.AppMessageCreator.create({
        security: { ucpId: 'abc' },
        producer: {
            type: export_1.ProducerType.UI,
            origin: {
                userApplication: {
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: export_1.AppMessageType.Command,
        messageName: "Login",
        command: export_1.Command.Start,
        data: {
            authenticationType: 'registeredEmail',
            email: email.toLowerCase(),
            timeout: 10
        },
    });
}
function getLogoutMessage(ucpId) {
    return export_1.AppMessageCreator.create({
        security: { ucpId },
        producer: {
            type: export_1.ProducerType.UI,
            origin: {
                userApplication: {
                    userAppId: "ui-123",
                    userAppName: "Client"
                }
            }
        },
        messageType: export_1.AppMessageType.Command,
        messageName: "Logout",
        command: export_1.Command.Logout,
        data: {},
    });
}
let ucpId = "Logging out now";
let login = getLoginMessage();
let logout = getLogoutMessage(ucpId);
console.log(login);
console.log(logout);
//# sourceMappingURL=testcase5.js.map