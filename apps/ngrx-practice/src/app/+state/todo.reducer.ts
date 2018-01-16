import { Todo } from './todo.interfaces';
import { TodoAction } from './todo.actions';

export function todoReducer(state: Todo, action: TodoAction): Todo {
  switch (action.type) {
    case 'DATA_LOADED': {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
}
