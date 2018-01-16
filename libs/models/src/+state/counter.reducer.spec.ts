import { counterReducer } from './counter.reducer';
import { counterInitialState } from './counter.init';
import { Counter } from './counter.interfaces';
import { DataLoaded } from './counter.actions';

describe('counterReducer', () => {
  it('should work', () => {
    const state: Counter = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = counterReducer(state, action);
    expect(actual).toEqual({});
  });
});
