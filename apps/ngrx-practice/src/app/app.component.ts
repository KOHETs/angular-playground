import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState, Counter } from '@angular-playground/models';
import { Observable } from 'rxjs/Observable';

interface AppState {
  counter: CounterState;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  counterState: Observable<CounterState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.counterState = this.store.select('counter');
  }

  increment() {
    this.store.dispatch(new Counter.Increment());
  }

  decrement() {
    this.store.dispatch(new Counter.Decrement());
  }

  reset() {
    this.store.dispatch(new Counter.Reset(0));
  }
}
