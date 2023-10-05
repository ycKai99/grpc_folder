/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
//import { MessageType, AppMessageType, MessageParameter } from '../fis/fismessagetype';
import { MessageType, AppMessageType, MessageParameter } from '../types/appmessagetype';
import { AppMessageCreator as AppMessage, createMessage } from '../message/appmessagecreator';
import * as fs from 'fs';

start();    // start test

function start() {
    let args = process.argv.slice(2);   // Gets arguments
    let argsCount: number = args.length;
    try {
        let alias: string;
        let messageParameter: string;
        if (argsCount === 1) {
            messageParameter = args[0];
        }
        else if (argsCount === 2) {
            alias = args[0];
            messageParameter = args[1];
        }
        else {
            throw "Message Tester Error: invalid arguments.\nSyntax:\n" + 
                "   appmessagetester MessageType MessageParametersJsonFIle\n" +
                "   appmessagetester MessageParametersJsonFIle";
        }
        test(AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));
        // if (argsCount > 1) {
        //     test(args[0], JSON.parse(fs.readFileSync(args[1], 'utf8')));
        // }
        // else {
        //     throw "Message Tester Error: invalid arguments.\nSyntax: appmessagetester MessageType MessageParametersJsonFIle";
        // }
    }
    catch (e) {
        throw e;
    }
}

function test(messageType: MessageType, messageParameter: MessageParameter) {
    try {
        messageParameter.messageType = messageType;
        console.log(JSON.stringify(
            AppMessage.create(messageParameter), null, 2));
            // createMessage(messageParameter), null, 2));
    }
    catch (e) {
        throw e;
    }
}