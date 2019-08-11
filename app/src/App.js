import React, { useLayoutEffect } from "react";
import "./App.css";
import Accueil from "./Page/Accueil";
import connectToStore from "./Store/connect";
import { Route, Switch } from 'react-router';
import useLayout from './Com/useLayout';
import DefaultLayout from "./Layout/DefaultLayout";
import Loading from "./Com/Loading";
import Atom from './Atom/Atom';

const AccueilScreen = useLayout(DefaultLayout, { title: "test" })(Accueil)
const AtomScreen = useLayout(DefaultLayout)(Atom)

function App({ store, api }) {
  useLayoutEffect(store.init, [])
  if (store.loading) return <Loading />

  return (
    <Switch>
      <Route exact={true} path="/" component={AccueilScreen} />
      <Route exact={true} path="/test" component={Accueil} />
      <Route exact={false} path="/*" component={AtomScreen} />
    </Switch>
  )

}



export default connectToStore(App);


