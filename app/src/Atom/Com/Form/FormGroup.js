import React from 'react'
import AtomList from './../AtomList';

function FormGroup(props) {
    return (
        <div>
            ...
        </div>
    )
}

FormGroup.tabName = "";
FormGroup.titre = "Form Group";
FormGroup.Config = ({ data }) => {
    data.list = data.list || [];
    return (
        <AtomList {...data.bind("list")} />
    )
}

export default FormGroup;