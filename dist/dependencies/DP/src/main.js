"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const DP_core_module_1 = require("./DP.core.module");
const port = 3700;
let app;
async function bootstrap() {
    app = await core_1.NestFactory.create(DP_core_module_1.DPCoreModule);
    await app.listen(port);
    console.log('Test server started at port: ' + port + ' .');
    console.log('Home page at ' + 'http://localhost:' + port + '/DP' + ' .');
}
bootstrap().then(() => {
});
//# sourceMappingURL=main.js.map