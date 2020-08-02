import React, {useState,  useEffect } from 'react';
import './index.css';
import Habit from './components/Habit.js'
import NewHabit from './components/NewHabit.js'
import Name from './components/Name.js'

import {
    toggleDeleteHabits
} from './store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

function App() {
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(state);
        localStorage.setItem('habits', JSON.stringify(state.habits))
        localStorage.setItem('name', JSON.stringify(state.name))
    }, [state])

  return (
    <div className="app">
            <div className="header">
                {/* <Name /> */}
                <h1>HabitPlant</h1>
                <div style={{'color': state.deleteHabits ? 'red' : ''}} className="remove-habit" onClick={() => dispatch(toggleDeleteHabits(!state.deleteHabits))}>Remove A Habit</div>
            </div>
            <div className="habits-container">
                {state.habits.map((habit, i) =>
                    <Habit
                        key={i}
                        habit={habit}
                        index={i}
                    />
                )}
                <NewHabit />
            </div>
    </div>
  );
}


export default App;
