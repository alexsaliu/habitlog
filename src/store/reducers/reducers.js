import {
    SET_TEST,
    UPDATE_HABITS,
    ADD_HABIT
} from '../constants.js';

const initialState = {
    test: "",
    habits: JSON.parse(localStorage.getItem('habits')) || []
}

export const habitsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_TEST:
            return {...state, test: action.payload};
        case UPDATE_HABITS:
            return {...state, habits: action.payload};
        case ADD_HABIT:
            return {...state, habits: [...state.habits, action.payload]};
        default:
            return state;
    }
}
