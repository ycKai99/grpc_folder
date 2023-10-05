/*!
 * fisappmessagejs V1.0.0
 * Copyright(c) 2020 Software Optima Sdn. Bhd.
 */
import { MessageType, AppMessageType, MessageParameter } from '../types/appmessagetype';
import { AppMessageProducerCreator as Producer, createProducerInformation } from '../message/producer/appmessageproducercreator';
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
            throw "Producer Tester Error: invalid arguments.\nSyntax:\n" + 
                "   appmessageproducertester producer MessageParametersJsonFIle\n" +
                "   appmessageproducertester MessageParametersJsonFIle";
        }
        test(AppMessageType[alias], JSON.parse(fs.readFileSync(messageParameter, 'utf8')));

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

function test(messageType: MessageType, messageParameter: MessageParameter) {
    try {
        messageParameter.messageType = messageType;
        // console.log(JSON.stringify(messageParameter, null ,2));
        console.log(JSON.stringify(
            Producer.create(messageParameter), null, 2));
            // createProducerInformation(messageParameter, producer), null, 2));            
    }
    catch (e) {
        throw e;
    }
}