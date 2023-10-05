// Note: This main.ts is used for testing only.

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DPCoreModule } from './DP.core.module';
 
// Test server port
const port = 3700;

// Test server startup
let app: INestApplication;

async function bootstrap() {
  app = await NestFactory.create(DPCoreModule);
  await app.listen(port);

  console.log('Test server started at port: ' + port + ' .');
  console.log('Home page at ' + 'http://localhost:' + port + '/DP' + ' .');
}
bootstrap().then( 
  () => { 
  },
);
