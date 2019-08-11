import store from './MainReducer'

function api(apiName, data = {}, options = {}) {
    let apiEndPoint = options.API_ENDPOINT || process.env.REACT_APP_API_ENDPOINT || "/api/";
    return fetch(apiEndPoint + apiName, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(rep => rep.json())
        .then(rep => {
            if (rep.header && rep.body) {
                (rep.header || []).map(elm => {
                    switch (elm.name) {
                        case "log":
                            console.log.apply(null, elm.data);
                            break;
                        default:
                            store.dispatch({ type: elm.name, payload: elm.data });
                            break;
                    }
                });
                return rep.body;
            }
            return rep;
        })
}

export default api;