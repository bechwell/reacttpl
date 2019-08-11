import React from 'react'

function Cols({ data }) {
    return <h1>{data.titre}</h1>
}

Cols.titre = "Colonnes";

Cols.Config = ({ data }) => {
    return (
        <input type="text" placeholder="Titre" {...data.bind("titre")} />
    )
}

export default Cols;