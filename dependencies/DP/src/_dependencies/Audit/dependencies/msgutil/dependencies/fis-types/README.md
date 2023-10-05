# FIS-Types library

FIS-Types library is used to maintain entity TypeScript Data type. This library can be shared by all applications and clients.

#### Library setup:

No special setup required.


#### Usage:
All client should import types exported from "./interface" and should not directly get the types from other folders.

```
import { statusException, statusResponse, ... }from "../interface/export"
```

You can refer to file "test\test.ts" for more samples. 
Here a simple sample is shown below:

```
const type1:statusResponse = {
    status:"1"
}
```