import { todoReducer } from './todo.reducer';
import { todoInitialState } from './todo.init';
import { Todo } from './todo.interfaces';
import { DataLoaded } from './todo.actions';

describe('todoReducer', () => {
  it('should work', () => {
    const state: Todo = {};
    const action: DataLoaded = { type: 'DATA_LOADED', payload: {} };
    const actual = todoReducer(state, action);
    expect(actual).toEqual({});
  });
});
