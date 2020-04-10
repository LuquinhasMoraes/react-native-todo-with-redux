import React from 'react';
import TodoApp from './components/TodoApp';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = function() {
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    )
}

export default App;