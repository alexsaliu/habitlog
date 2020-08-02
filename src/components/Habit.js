import React, {useState,  useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTree } from '@fortawesome/free-solid-svg-icons'
import './habit.css';

import {
    setTest,
    updateHabits,
    deleteHabit
} from '../store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

const Habit = ({habit, index}) => {
    const [records, setRecords] = useState([]);
    const [bestStreak, setBestStreak] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    const [completed, setCompleted] = useState(0);

    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(moment().format());
        console.log(moment('2020-07-21').add(7, 'days').isSame(moment(), 'day'));
        console.log("STart date: ", habit.startDate);
        let dateDiff = moment().diff(habit.startDate, 'days');
        if (habit.length < dateDiff) {
            updateRecordsToDate(dateDiff);
        }
    }, [])

    const updateRecordsToDate = (dateDiff) => {
        let habits = state.habits;
        let records = habit.records;
        for (let i = 0; i < dateDiff; i++) {
            records += '0';
        }
        let updatedHabit = {...habit, records};
        habits[index] = updatedHabit;
        dispatch(updateHabits(habits));
    }

    useEffect(() => {
        setRecords(habit.records.split(''));
        setBestStreak(calcBestStreak(habit.records));
        setCurrentStreak(calcCurrentStreak(habit.records));
        setCompleted(calcCompleted(habit.records));
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

    const calcCompleted = (data) => {
        let count = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === '1') count ++;
        }
        return count;
    }

    const changeStatus = (status, i) => {
        if (i !== habit.records.length - 1) return;
        let habits = state.habits;
        let newStatus = status === '1' ? '0' : '1';
        let newHabit = {...habit, records: alterString(habit.records, i, newStatus)};
        console.log(newHabit);
        habits[index] = newHabit;
        dispatch(updateHabits(habits));
    }

    const alterString = (oldString, index, replacement) => {
      return oldString.substr(0, index) + replacement + oldString.substr(index + replacement.length);
    }

    const handelDeleteHabit = (index) => {
        let habits = [];
        for (let i = 0; i < state.habits.length; i++) {
            if (i !== index) {
                habits.push(state.habits[i]);
            }
        }
        dispatch(deleteHabit(habits));
    }

    const updateTarget = (habit, index) => {
        console.log("Update target");
        // let habits = state.habits;
        // let target = '90';
        // let updatedHabit = {...habit, target};
        // habits[index] = updatedHabit;
        // dispatch(updateHabits(habits));
    }


  return (
    <div className="habit">
        <div className="card-container" style={{'borderTop': `3px solid ${habit.color}`}}>
            {state.deleteHabits ? <div onClick={() => handelDeleteHabit(index)} className="remove">x</div> : ""}
            <FontAwesomeIcon class="tree-icon" icon={faTree}
                style={{
                    top: `-${(calcCompleted(habit.records) < 31 ? calcCompleted(habit.records) : 31) + 2}px`, 
                    color: habit.color,
                    height: '31px'
                }}
            />
            <div className="info">
                <div className="title">{habit.name}</div>
                <div onClick={() => updateTarget(habit, index)} className="score" style={{'border': `1px solid ${habit.color}`}}>{completed}/{habit.target}</div>
                <div className="streak">Streak <span>{currentStreak}</span></div>
            </div>
            <div className="item-container">
                {records.map((item, i) =>
                    <div
                        onClick={() => changeStatus(item, i)}
                        style={{
                            background: item === '1' ? habit.color : '#fbfbfb',
                            height: i !== habit.records.length - 1 ? '' : '20px'
                        }}
                        className="item"
                        key={i}>
                    </div>
                )}
                {/* <div
                    onClick={() => changeStatus(item, i)}
                    style={{background: item === '1' ? habit.color : '#fbfbfb'}}
                    style={{background: '#fbfbfb'}}
                    className="item">
                </div> */}
            </div>
            {/* <div className="add" @click="addItem">
            Add +
            </div> */}
        </div>
    </div>
  );
}


export default Habit;
