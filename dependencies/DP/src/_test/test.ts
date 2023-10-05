import { HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { testLoginSubscribe_Http } from './testcase1';
import { testLoginLogout_WebSocket } from './testcase2';
import { testLoginLogout_Http } from './testcase3';
import { testConnection } from './testcase4';

 
// Test case 1:
testLoginLogout_WebSocket()

// Test case 2:
testLoginLogout_Http()

// Test case 3:
testLoginSubscribe_Http();

testConnection();