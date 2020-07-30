import {
    SET_NAME,
    UPDATE_HABITS,
    ADD_HABIT,
    TOGGLE_DELETE_HABITS,
    DELETE_HABIT
} from '../constants.js';

const initialState = {
    name: JSON.parse(localStorage.getItem('name')) || "",
    habits: JSON.parse(localStorage.getItem('habits')) || [],
    deleteHabits: false,
}

export const habitsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_NAME:
            return {...state, name: action.payload};
        case UPDATE_HABITS:
            return {...state, habits: action.payload};
        case ADD_HABIT:
            return {...state, habits: [...state.habits, action.payload]};
        case TOGGLE_DELETE_HABITS:
            return {...state, deleteHabits: action.payload};
        case DELETE_HABIT:
            return {...state, habits: action.payload};
        default:
            return state;
    }
}
