import { asyncScheduler, interval, Observable } from 'rxjs';
import { delay, filter, map, observeOn, tap } from 'rxjs/operators';

// Create an observable that emits a number every second
const source$: Observable<number> = interval(1000);

// Create an observable that emits a random boolean value every second
const trigger$: Observable<boolean> = interval(1000).pipe(
    // tap(() => console.log('Trigger emitted')),
    map(() => Math.random() < 0.5),
    tap(triggered => {
        console.log('Scheduler triggered by:', triggered);
    })
);

let triggerSubscription = trigger$.subscribe((val) => {
    if (val) { // if it's true
        console.log(`Starting scheduler... ${val}`);

        source$.pipe(
            observeOn(asyncScheduler)
        ).subscribe(() => console.log('Scheduler completed. Starting source...'));

        // Pause trigger emissions while waiting for the scheduler to complete
        triggerSubscription.unsubscribe();
        setTimeout(() => {
            console.log('Resuming trigger emissions...');
            triggerSubscription = trigger$.subscribe();
        }, 5000);
    }
});

source$.subscribe(e=>{
    console.log(e)
})

// Not applicable to the our solution. There's no way to dynamically activate scheduler or assign it to existing observable emission.
// Going back to test3 asyncScheduler example, it can only delay the amount of time (prefined), and then subscribe. There 's no way 
// to delay an existing observable unless we pipe it, which is not something we want to do since we want to save space in the first place.
// Piping means creating another observable