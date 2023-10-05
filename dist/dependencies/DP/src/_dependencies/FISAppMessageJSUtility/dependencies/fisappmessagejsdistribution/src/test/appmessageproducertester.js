"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageproducercreator_1 = require("../message/producer/appmessageproducercreator");
const fs = require("fs");
start();
function start() {
    let args = process.argv.slice(2);
    let argsCount = args.length;
    try {
        let alias;
        let messageParameter;
        if (argsCount === 1) {
            messageParameter = args[0];
        }
        else if (argsCount === 2) {
            alias = args[0];
            messageParameter = args[1];
        }
        else {
            throw "Producer Tester Error: invalid arguments.\nSyntax:\n" +
                "   appmessageproducertester producer MessageParametersJsonFIle\n" +
                "   appmessageproducertester MessageParametersJsonFIle";
        }
        test(appmessagetype_1.AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));
    }
    catch (e) {
        throw e;
    }
}
function test(messageType, messageParameter) {
    try {
        messageParameter.messageType = messageType;
        console.log(JSON.stringify(appmessageproducercreator_1.AppMessageProducerCreator.create(messageParameter), null, 2));
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=appmessageproducertester.js.map