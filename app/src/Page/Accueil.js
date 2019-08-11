import React, { useEffect } from 'react'
import connectToStore from '../Store/connect';


function Accueil({ store, api }) {
    useEffect(() => {
        store.firebase.db.ref("test-react").set((new Date()).getTime());
        store.setTitle("Accueil")
        api("product")
        console.log("product")
    }, [])
    return (
        <div>
            <h1>Accueil</h1>
            <button onClick={e => store.firebase.auth('google')}>auth via google</button>
            <button onClick={e => store.firebase.auth('facebook')}>auth via facebook</button>
        </div>
    );
}


function Crud({ store }) {
    let mdl = {};
    return (
        <div>
            <Crud api="" actions={mdl}>

            </Crud>
        </div>
    );
}

export default connectToStore(Accueil);