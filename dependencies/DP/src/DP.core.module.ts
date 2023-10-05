/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { DPCoreController } from './DP.core.controller';
import { HttpModule, HttpService } from '@nestjs/axios';
//import { Transport, MicroserviceOptions, ClientsModule } from '@nestjs/microservices';  
import { ClientsModule, RedisOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { DomainProxyController } from './MessageDelivery/MessageTransmission/DP.controller';
import { MicroserviceDomainProxyService } from './MessageDelivery/MessageTransmission/microservice/MD.microservice.service';

@Module({
  imports: [HttpModule],
  controllers: [DPCoreController, DomainProxyController],
  providers: [
    /*{
      provide: 'DomainProxyServiceInject',
      useClass:  DomainProxyService  // To be reused by other modules
    }, */
    DomainProxyController,
    MicroserviceDomainProxyService,
  ],
})
export class DPCoreModule {}
