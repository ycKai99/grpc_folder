import { FisCreateMessageUtility, RequestMessage } from '../_interfaces/export';
import { process } from '../_environment/environment';

export const IS_NODE = typeof global === 'object' && '[object global]' === global.toString.call(global);
export const IS_BROWSER = typeof window === 'object' && '[object Window]' === window.toString.call(window);

console.log(`IS_NODE: ${IS_NODE}`);
console.log(`IS_BROWSER: ${IS_BROWSER}`);

// Testing to see if we can access the environment file. Switch env to using json format to cater 
// for node and browser environment..
console.log(process.env.UCP_Url)


const messageUtil:FisCreateMessageUtility = new FisCreateMessageUtility("FisAppID/Name")
const newLoginRequestMessage:RequestMessage = messageUtil.getLoginMessage();  
console.log(newLoginRequestMessage)