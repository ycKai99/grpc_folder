"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const observer_module_1 = require("./observer.module");
const session = require("express-session");
const bodyParser = require('body-parser');
require('dotenv').config();
const port = process.env.PORT_SERVER;
async function bootstrap() {
    const app = await core_1.NestFactory.create(observer_module_1.ObserverModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(session({
        secret: 'fisobserver-secret-key',
        resave: false,
        saveUninitialized: false
    }));
    await app.listen(port);
    // const testCase4 = testing4();
    console.log("Server started at " + port + ".");
}
bootstrap();
//# sourceMappingURL=main.js.map