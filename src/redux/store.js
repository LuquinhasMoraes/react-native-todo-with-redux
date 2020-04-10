import { createStore } from 'redux';
import { composeWithDevTools } from "remote-redux-devtools";
import {reducer} from './reducers';

const composeEnhancers = composeWithDevTools({
    realtime: true,
    port: 8000,
    hostname: 'localhost'
});

const store = createStore(reducer, composeEnhancers());

export default store;