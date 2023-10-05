"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const source$ = (0, rxjs_1.interval)(1000);
const trigger$ = (0, rxjs_1.interval)(1000).pipe((0, operators_1.map)(() => Math.random() < 0.5), (0, operators_1.tap)(triggered => {
    console.log('Scheduler triggered by:', triggered);
}));
let triggerSubscription = trigger$.subscribe((val) => {
    if (val) {
        console.log(`Starting scheduler... ${val}`);
        source$.pipe((0, operators_1.observeOn)(rxjs_1.asyncScheduler)).subscribe(() => console.log('Scheduler completed. Starting source...'));
        triggerSubscription.unsubscribe();
        setTimeout(() => {
            console.log('Resuming trigger emissions...');
            triggerSubscription = trigger$.subscribe();
        }, 5000);
    }
});
source$.subscribe(e => {
    console.log(e);
});
//# sourceMappingURL=scheduler_showcase.js.map