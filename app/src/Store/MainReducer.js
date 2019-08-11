import React from "react";
import { createStore } from 'redux'
import Firebase from './Firebase';
import api from "./api";

function dispatch(type, payload = null) {
	store.dispatch({ type, payload });
}

var initialState = {
	firebase: new Firebase(),
	routes: {
		accueil: "/",
	},
	setTitle: titre => {
		document.title = titre
	},
	config: {},
	loading: true,
	init: () => dispatch("init")
}

function MainReducer(state = initialState, action) {
	switch (action.type) {
		case "init":
			state.loading = true;
			api("init").then(rep => dispatch("setInitData", rep))
			break;
		case "setInitData":
			state = { ...state, loading: false, config: { ...state.config, ...(action.payload || {}) } };
			break;
		case "test":
			console.log("MainReducer : test :", action);
			break;

		default:
			break;
	}
	return { ...state }
}


const store = createStore(MainReducer);

export default store;