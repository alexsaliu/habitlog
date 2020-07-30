import React, {useState,  useEffect } from 'react';
import moment from 'moment';
import './newHabit.css';
import { habitColors, targetDays } from '../content.js';

import {
    addHabit
} from '../store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

const NewHabit = () => {
    const [addingHabbit, setAddingHabbit] = useState(false);
    const [colors, setColors] = useState(habitColors);
    const [targets, setTargets] = useState(targetDays);
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');
    const [habitApproved, setHabitApproved] = useState(false);
    const [habitName, sethabitName] = useState('');
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        setHabitApproved((habitName.length > 0 && selectedColor && selectedTarget));
    }, [habitName, selectedColor, selectedTarget])

    const addNewHabit = () => {
        if (!habitApproved) return;
        let habit = {
            name: habitName,
            records: '0',
            color: selectedColor,
            startDate: moment().format(),
            target: selectedTarget
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
                        </div>)
                    }
                </div>
                <div className="target-label">Duration target (days)</div>
                <div className="targets">
                    {
                        targets.map((target, i) =>
                        <div
                            onClick={() => setSelectedTarget(target)}
                            key={i}
                            style={{border: `2px solid ${selectedTarget === target ? selectedColor ? selectedColor : 'black' : 'lightgrey'}`}}
                        >
                            {target}
                        </div>)
                    }
                </div>
                <button style={{background: `${habitApproved ? selectedColor : '#fbfbfb'}`}} className="add-habit" onClick={() => addNewHabit()}>Add habit</button>
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
