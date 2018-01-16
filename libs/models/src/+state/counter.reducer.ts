import { Counter } from './counter.interfaces';
import * as CounterActions from './counter.actions';

export function counterReducer(state: Counter, action: CounterActions.All) {
  switch (action.type) {
    case CounterActions.INCREMENT: {
      return { ...state, counter: state.counter + 1 };
    }
    case CounterActions.DECREMENT: {
      return { ...state, counter: state.counter > 0 ? state.counter - 1 : 0 };
    }
    case CounterActions.RESET: {
      return { ...state, counter: action.payload };
    }
    default: {
      return state;
    }
  }
}
