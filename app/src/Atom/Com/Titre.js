import React from 'react'

function Titre({ data }) {
    return <h1>{data.titre}</h1>
}

Titre.tabName = "";
Titre.titre = "Titre Principal";
Titre.Config = ({ data }) => {
    return (
        <input type="text" placeholder="Titre" {...data.bind("titre")} />
    )
}

export default Titre;