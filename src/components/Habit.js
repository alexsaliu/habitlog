import React, {useState,  useEffect } from 'react';
import './habit.css';

import {
    setTest,
    updateHabits
} from '../store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

const Habit = ({habit, index}) => {
    const [records, setRecords] = useState([]);
    const [bestStreak, setBestStreak] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);

    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        setRecords(habit.records.split(''));
        setBestStreak(calcBestStreak(habit.records));
        setCurrentStreak(calcCurrentStreak(habit.records));
    }, [habit])

    const calcBestStreak = (data) => {
      let best = 0;
      let streak = 0;
      for (let i = 1; i < data.length; i++) {
        if (data[i] === '1' && data[i] === data[i -1]) streak ++;
        if (streak > best) best = streak;
      }
      return data.includes('1') ? best + 1 : 0;
    }

    const calcCurrentStreak = (data) => {
      let streak = parseInt(data[data.length - 1]);
      for (let i = data.length - 1; i > 0; i--) {
        if (data[i - 1] === '0') return streak;
        streak ++;
      }
      return streak;
    }

    const changeStatus = (status, i) => {
        let habits = state.habits;
        let newStatus = status === '1' ? '0' : '1';
        let newHabit = {...habit, records: alterString(habit.records, i, newStatus)};
        habits[index] = newHabit;
        dispatch(updateHabits(habits));
    }

    const alterString = (oldString, index, replacement) => {
      return oldString.substr(0, index) + replacement + oldString.substr(index + replacement.length);
    }


  return (
      <div className="habit">
          <div className="title">{habit.name}</div>
          <div className="card-container" style={{'borderTop': `3px solid ${habit.color}`}}>
            {/* <div v-if="removehabits" @click="$emit('remove', index)" className="remove">x</div> */}
            <div className="info">
              <div className="streak">streak <span>{currentStreak}</span></div>
              <div className="score">total {habit.records.length}</div>
            </div>
            <div className="item-container">
                {records.map((item, i) =>
                    <div
                        onClick={() => changeStatus(item, i)}
                        style={{background: item === '1' ? habit.color : '#fbfbfb'}}
                        className="item"
                        key={i}>
                    </div>
                )}
              {/* <div
                v-for="(status, i) in habit.records"
                :key="i"
                :style="{background: status === '1' ? habit.color : '#fbfbfb'}"
                :className="['item']"
                @click="changeStatus(status, i)"
              ></div> */}
            </div>
            {/* <div className="add" @click="addItem">
              Add +
            </div> */}
          </div>
        </div>
  );
}


export default Habit;
