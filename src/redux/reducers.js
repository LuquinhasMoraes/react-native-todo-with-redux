import { combineReducers } from 'redux';

export const reducer = combineReducers({
    todos: (state = [], action) => {
        switch (action.type) {
            case 'ADD_TODO':
                const newTodo = action.payload;
                return [...state, newTodo];

            case 'REMOVE':
                return state.filter(x => x.id !== action.payload.id);
            
            case 'DONE':
  
                return state.map(todo => {
                    // console.log(action, todo)
                    if(todo.id === action.payload.id) {
                        const t = {...todo, completed: !todo.completed};
                        console.log(t);
                        return t;
                    } else {
                        return todo;
                    }
                });

            default:
                return state;
        }
    }
});