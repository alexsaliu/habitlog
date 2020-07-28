import { combineReducers } from 'redux';

import { habitsReducer } from './reducers/reducers.js';

export const rootReducer = combineReducers({
    habits: habitsReducer
})
