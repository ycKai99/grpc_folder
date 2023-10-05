"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const trigger$ = (0, rxjs_1.interval)(1000).pipe((0, operators_1.map)(() => Math.random() < 0.5), (0, operators_1.tap)(triggered => {
    if (triggered) {
        console.log('Buffering triggered by:', triggered);
    }
    else {
        console.log('Buffering not triggered by:', triggered);
    }
}));
const intervalEvents = (0, rxjs_1.interval)(1000);
const buffered = intervalEvents.pipe((0, operators_1.buffer)(trigger$.pipe((0, operators_1.filter)(value => !value))));
buffered.subscribe(x => console.log(x));
//# sourceMappingURL=buffer_showcase.js.map