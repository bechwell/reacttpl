import React, { useState, useEffect } from 'react'
import api from './../Store/api';
import Loading from '../Com/Loading';
import "./Atom.css"
import AtomList from './Com/AtomList';


function Atom(props) {
    let [state, setState] = useState({ loading: true, list: [] })
    state.set = (obj = {}) => {
        state = { ...state, ...obj };
        setState(state);
    }
    useEffect(() => {
        api("atomGetData", { url: props.match.url })
            .then(rep => {
                state.set({ ...rep, loading: false })
            })
    }, [props.match.url])

    if (state.loading) return <Loading />

    let { list } = state;
    state.save = (cb) => {
        return api("atomSetData", state).then(r => cb ? cb() : r)
    }

    return (
        <div className="atom-main">
            <AtomList value={list} onChange={({ validate, callback }) => {
                state.set({})
                if (validate) return state.save(callback)
                if (callback) callback();
            }} />
        </div>
    )
}





export default Atom;