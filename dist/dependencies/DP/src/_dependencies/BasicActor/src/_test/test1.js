"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const basic_actor_1 = require("../basic.actor");
const newActor = new basic_actor_1.BasicActor();
const incomingObservable = (0, rxjs_1.interval)(3000);
newActor.initialise();
newActor.send(incomingObservable).subscribe({
    error: (err) => {
        console.log(err.message);
    },
    next: (msg) => {
        console.log("Received Published Message");
        console.log(JSON.stringify(msg));
    },
    complete: () => {
        console.log("Completed.");
    }
});
//# sourceMappingURL=test1.js.map