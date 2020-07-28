import React, {useState,  useEffect } from 'react';
import './index.css';

import Habit from './components/Habit.js'

import {
    setTest
} from './store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

function App() {
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(state);
    }, [state])


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

                {/* <div v-if="!addinghabit" @click="addinghabit = true" className="add-placeholder">
                    Add<span>+</span>
                </div>
                <div v-else className="new-habit">
                    <input v-model="newhabit" type="text" placeholder="name"/>
                    <div className="colors">
                        <div v-for="(color, i) in colors" :key="i" className="color" @click="selectColor(i)" :style="{border: `2px solid ${color}`, background: color ===  selectedColor ? color : ''}"></div>
                    </div>
                    <button className="add-habit" @click="addhabit()">Add habit</button>
                </div> */}
            </div>
    </div>
  );
}


export default App;
