/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Header } from '@nestjs/common';

@Controller('DP')
export class DPCoreController {
  @Get()
  testreturn() {
    return 'Hello there.';
  }
}
