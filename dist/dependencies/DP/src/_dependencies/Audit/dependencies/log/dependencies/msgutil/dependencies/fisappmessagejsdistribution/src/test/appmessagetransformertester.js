"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appmessagetransformercreator_1 = require("../transform/appmessagetransformercreator");
const fs = require("fs");
const util = require("util");
start();
function start() {
    let args = process.argv.slice(2);
    let argsCount = args.length;
    try {
        if (argsCount > 0) {
            let data = fs.readFileSync(args[0]);
            let message = data.toString();
            if (data.toString('utf-8', 0, 1).charCodeAt(0) === 65533) {
                message = new util.TextDecoder('utf-16le').decode(data);
            }
            else {
                message = data.toString();
            }
            test(JSON.parse(message));
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
        console.log(JSON.stringify((0, appmessagetransformercreator_1.transform)(message), null, 2));
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=appmessagetransformertester.js.map