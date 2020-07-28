import {
    SET_TEST,
    UPDATE_HABITS
} from '../constants.js';

const initialState = {
    test: "",
    habits: [
      {
        name: 'bed 10pm',
        records: '010',
        color: 'lightgreen'
      },
      {
        name: 'exercise',
        records: '111',
        color: 'yellow'
      },
      {
        name: '1 hour',
        records: '111',
        color: 'lightblue'
      }
    ]
}

export const habitsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_TEST:
            return {...state, test: action.payload};
        case UPDATE_HABITS:
            return {...state, habits: action.payload};
        default:
            return state;
    }
}
