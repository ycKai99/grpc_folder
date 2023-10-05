import { StatusException, StatusResponse } from '../interface/export';

// Some simple error typing check.

console.log('Create status response data.');
const type1: StatusResponse = {
  status: '1',
};
console.log(type1);

console.log('Create status exception data.');
const type2: StatusException = {
  status: '1',
  code: -1,
  message: 'some error.',
};
console.log(type2);

console.log('Test completed.');
