import {
    SET_NAME,
    UPDATE_HABITS,
    ADD_HABIT,
    TOGGLE_DELETE_HABITS,
    DELETE_HABIT
} from '../constants.js';

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: name,
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

export const toggleDeleteHabits = (bool) => {
    return {
        type: TOGGLE_DELETE_HABITS,
        payload: bool,
    }
}

export const deleteHabit = (habit) => {
    return {
        type: DELETE_HABIT,
        payload: habit,
    }
}
