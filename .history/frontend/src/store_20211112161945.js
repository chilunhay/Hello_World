import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composerWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({


});

let intitialState = {};

const middleware = [thunk]

const store = createStore(reducer)