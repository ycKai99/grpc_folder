# FIS Logging service
FIS Format Transformer library is used to transform any messages or data. This library can be shared by all applications and clients.

Note:
Client should first initialize their storage settings before proceeding to log their messages. UUID will be generated for the profile and its subsequent settings except for applogloc, which itself must be generated along with the payload(messages to be logged).
#### Library setup:

No special setup required.

Install required node modules:

```  
npm install
```  
Pull submodules: 

```  
git submodule update --init --recursive
```  
#### Usage:
All client should import class exported from "./interface" and should not directly get the class from other folders.

Refer to "../test/test.ts" for more information.