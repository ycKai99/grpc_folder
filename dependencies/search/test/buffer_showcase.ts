import { interval } from 'rxjs';
import { buffer, filter, map, pairwise, tap } from 'rxjs/operators';

// // Create an observable that emits a number every second
// const source$ = interval(1000);

// // Create an observable that emits a random boolean value every 3 seconds
const trigger$ = interval(1000).pipe(
  map(() => Math.random() < 0.5),
  tap(triggered => {
    if (triggered) {
      console.log('Buffering triggered by:', triggered);
    } else {
      console.log('Buffering not triggered by:', triggered);
    }
  })
);

// // Buffer the values emitted by source$ between two true values emitted by trigger$
// source$.pipe(
//   buffer(trigger$.pipe(
//     pairwise(),
//     filter(([prev, curr]) => prev === false && curr === true),
//     map(([_, curr]) => curr)
//   ))
// ).subscribe(bufferedValues => {
//   console.log('Buffered values:', bufferedValues);
// });


const intervalEvents = interval(1000);
const buffered = intervalEvents.pipe(buffer(trigger$.pipe(filter(value => !value))));
// const buffered = intervalEvents.pipe(buffer(trigger$.pipe(map(val => !val))));
buffered.subscribe(x => console.log(x));