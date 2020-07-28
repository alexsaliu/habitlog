import {
    SET_TEST,
    UPDATE_HABITS,
    ADD_HABIT
} from '../constants.js';

export const setTest = (val) => {
    return {
        type: SET_TEST,
        payload: val,
    }
}

export const updateHabits = (habits) => {
    return {
        type: UPDATE_HABITS,
        payload: habits,
    }
}

export const addHabit = (habit) => {
    return {
        type: ADD_HABIT,
        payload: habit,
    }
}
