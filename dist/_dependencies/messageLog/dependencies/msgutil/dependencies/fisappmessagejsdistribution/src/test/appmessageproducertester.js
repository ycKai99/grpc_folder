"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
const appmessagetype_1 = require("../types/appmessagetype");
const appmessageproducercreator_1 = require("../message/producer/appmessageproducercreator");
const fs = require("fs");
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
            throw "Producer Tester Error: invalid arguments.\nSyntax:\n" +
                "   appmessageproducertester producer MessageParametersJsonFIle\n" +
                "   appmessageproducertester MessageParametersJsonFIle";
        }
        test(appmessagetype_1.AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));
        // if (argsCount > 0) {
        //     if (args[1]) {messageParameter = JSON.parse(fs.readFileSync(args[1], 'utf8'));}
        //     test(args[0], messageParameter);
        // }
        // else {
        //     throw "Producer Tester Error: invalid arguments.\nSyntax: appmessageproducertester producer MessageParametersJsonFIle\nMessageParametersJsonFIle is optional.";
        // }
    }
    catch (e) {
        throw e;
    }
}
function test(messageType, messageParameter) {
    try {
        messageParameter.messageType = messageType;
        // console.log(JSON.stringify(messageParameter, null ,2));
        console.log(JSON.stringify(appmessageproducercreator_1.AppMessageProducerCreator.create(messageParameter), null, 2));
        // createProducerInformation(messageParameter, producer), null, 2));            
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=appmessageproducertester.js.map