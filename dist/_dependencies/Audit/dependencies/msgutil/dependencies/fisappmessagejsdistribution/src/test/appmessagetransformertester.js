"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetransformercreator_1 = require("../transform/appmessagetransformercreator");
const fs = require("fs");
const util = require("util");
start(); // start test
function start() {
    let args = process.argv.slice(2); // Gets arguments
    let argsCount = args.length;
    try {
        if (argsCount > 0) {
            let data = fs.readFileSync(args[0]);
            let message = data.toString();
            // Remove byte order mark(BOM) from the output
            // console.log(data.toString('utf-8', 0,1).charCodeAt(0)); 
            if (data.toString('utf-8', 0, 1).charCodeAt(0) === 65533) {
                message = new util.TextDecoder('utf-16le').decode(data);
            }
            else {
                message = data.toString();
            }
            // console.log(message);
            test(JSON.parse(message));
            // let message: string = fs.readFileSync(args[0]).toString('ascii')
            // console.log(message.charCodeAt(0));
            // if (message.charCodeAt(0) === 0xFEFF) {
            //     message = message.slice(1);
            //     console.log(message);
            // }            
            // test(JSON.parse(message));
            // test(JSON.parse(fs.readFileSync(args[0]).toString()));
        }
        else {
            throw "Message Tester Error: invalid arguments.\nSyntax: appmessagetransformertester MessageJsonFile";
        }
    }
    catch (e) {
        throw e;
    }
}
function test(message) {
    try {
        console.log(JSON.stringify(
        // MessageTransformer.transform(message), null, 2));
        appmessagetransformercreator_1.transform(message), null, 2));
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=appmessagetransformertester.js.map