import React, {useState,  useEffect } from 'react';
import './newHabit.css';
import { habitColors } from '../content.js';

import {
    addHabit
} from '../store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

const NewHabit = () => {
    const [addingHabbit, setAddingHabbit] = useState(false);
    const [colors, setColors] = useState(habitColors);
    const [selectedColor, setSelectedColor] = useState('');
    const [habitName, sethabitName] = useState('');
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    const addNewHabit = () => {
        if (habitName.length < 1 || !selectedColor) return;
        let habit = {
            name: habitName,
            records: '0',
            color: selectedColor,
            startDate: ''
        }
        dispatch(addHabit(habit));
        setAddingHabbit(false);
    }

    if (addingHabbit) {
        return (
            <div className="new-habit">
                <input onChange={(e) => sethabitName(e.target.value)} type="text" placeholder="name"/>
                <div className="colors">
                    { colors.map((color, i) =>
                    <div
                        onClick={() => setSelectedColor(color)}
                        style={{border: `2px solid ${color}`, background: color === selectedColor ? color : ''}}
                        className="color"
                        key={i}
                    >
                    </div>)}
                </div>
                <button className="add-habit" onClick={() => addNewHabit()}>Add habit</button>
            </div>
        );
    }
    else {
        return (
            <div onClick={() => setAddingHabbit(true)} className="add-placeholder">
                Add<span>+</span>
            </div>
        );
    }
}


export default NewHabit;
