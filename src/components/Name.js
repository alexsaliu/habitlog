import React, {useState,  useEffect } from 'react';
import './name.css';

import {
    setName
} from '../store/actions/actions.js';

import { useSelector, useDispatch } from 'react-redux';

const Name = () => {
    const [newName, setNewName] = useState("");
    const [toggleNameInput, setToggleNameInput] = useState(false);
    const state = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        setToggleNameInput(!(state.name));
        setNewName(state.name);
    }, [state.name])

    const submitName = (name) => {
        if (name.length > 0) {
            setToggleNameInput(false);
            dispatch(setName(name));
        }
    }

    if (toggleNameInput) {
        return (
            <div className="name">
                <input autoFocus onChange={(e) => setNewName(e.target.value)} type="text" placeholder="Name" value={newName}/>
                <button onClick={() => submitName(newName)}>Submit</button>
            </div>
        );
    }
    else {
        return (
            <div style={{'color': state.name ? 'grey' : ''}} onClick={() => setToggleNameInput(true)} className="name-placeholder">
                {state.name ? state.name : 'Add Name'}
            </div>
        );
    }
}

export default Name;
