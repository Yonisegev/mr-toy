import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { toyReducer } from './reducers/toyReducer';
import { userReducer } from './reducers/userReducer';

const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
