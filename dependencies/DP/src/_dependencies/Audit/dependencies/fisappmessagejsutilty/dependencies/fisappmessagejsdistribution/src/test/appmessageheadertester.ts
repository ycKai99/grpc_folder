/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
//import { MessageType, AppMessageType, MessageParameter } from '../fis/fismessagetype';
import { AppMessageHeaderCreator as MessageHeader, createMessageHeader } from '../message/appmessageheadercreator';
import * as fs from 'fs'; 
import { MessageType, AppMessageType, MessageParameter } from '../types/appmessagetype';

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
            throw "Message Header Tester Error: invalid arguments.\nSyntax:\n" + 
                "   appmessageheadertester MessageType MessageParametersJsonFIle\n" +
                "   appmessageheadertester MessageParametersJsonFIle";
        }
        test(AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));

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

function test(messageType: MessageType, messageParameter: MessageParameter) {
    try {
        messageParameter.messageType = messageType;
        console.log(JSON.stringify(
            MessageHeader.create(messageParameter), null, 2));
            // createMessageHeader(messageParameter, messageType), null, 2));
    }
    catch (e) {
        throw e;
    }
}