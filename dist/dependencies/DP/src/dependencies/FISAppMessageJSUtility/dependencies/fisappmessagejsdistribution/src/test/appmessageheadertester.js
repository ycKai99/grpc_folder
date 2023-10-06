"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
//import { MessageType, AppMessageType, MessageParameter } from '../fis/fismessagetype';
const appmessageheadercreator_1 = require("../message/appmessageheadercreator");
const fs = require("fs");
const appmessagetype_1 = require("../types/appmessagetype");
start(); // start test
function start() {
    let args = process.argv.slice(2); // Gets arguments
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
            throw "Message Header Tester Error: invalid arguments.\nSyntax:\n" +
                "   appmessageheadertester MessageType MessageParametersJsonFIle\n" +
                "   appmessageheadertester MessageParametersJsonFIle";
        }
        test(appmessagetype_1.AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));
        // if (argsCount > 1) {
        //     test(args[0], JSON.parse(fs.readFileSync(args[1], 'utf8')));
        // }
        // else {
        //     throw "Message Header Tester Error: invalid arguments.\nSyntax: appmessageheadertester MessageType MessageParametersJsonFIle";
        // }
    }
    catch (e) {
        throw e;
    }
}
function test(messageType, messageParameter) {
    try {
        messageParameter.messageType = messageType;
        console.log(JSON.stringify(appmessageheadercreator_1.AppMessageHeaderCreator.create(messageParameter), null, 2));
        // createMessageHeader(messageParameter, messageType), null, 2));
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=appmessageheadertester.js.map