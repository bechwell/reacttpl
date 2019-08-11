import React from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import api from './api';

export default function connectToStore(Com) {
    return connect(
        store => ({ store, api }),
        dispatch => ({
            dispatch: (type, payload = {}) => dispatch({ type, payload })
        })
    )(withRouter(props => {

        const injectProps = {
            to: url => props.history.push(url),
            createState: args => props.store.createState(args)
        }

        return <Com {...props} {...injectProps} />
    }));
}
