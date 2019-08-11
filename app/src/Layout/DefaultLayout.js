import React, { useState } from 'react'

function DefaultLayout(props) {
    let [state, setState] = useState(props || {});

    if (props.model) {
        props.model.set = (obj = {}) => {
            state = { ...state, ...obj };
            setState(state);
        }
    }

    return (
        <div className="container">
            <br />
            <h1>{state.title}</h1>
            <div>
                {props.children}
            </div>
        </div>
    )
}


export default DefaultLayout;