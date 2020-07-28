import React, {useState,  useEffect } from 'react';
import './index.css';
import Habit from './components/Habit.js'
import NewHabit from './components/NewHabit.js'

import {
    setTest
} from './store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

function App() {
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(state);
        localStorage.setItem('habits', JSON.stringify(state.habits))
    }, [state])

    const addHabit = () => {
        console.log("ok");
    }

  return (
    <div className="app">
        <input onChange={(e) => dispatch(setTest(e.target.value))} type="text" />
            {/* {state.test} */}
            <div className="cards-container">
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
