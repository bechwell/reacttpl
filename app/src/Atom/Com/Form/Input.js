import React, { useEffect } from 'react'

function Input(props) {
    let args = { ...props };
    useEffect(() => {
        if (!args.value && args.defaultValue) {
            args.value = args.defaultValue;
        }
    }, []);
    return (
        <div>
            <input {...args} />
        </div>
    )
}

Input.title = "Input"
Input.injectInProps = true;
Input.Config = ({ data }) => {
    return (
        <div>
            <input placeholder="PlaceHolder" {...data.bind("placeholder")} />
            <select {...data.bind("type")}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="time">Time</option>
            </select>
            <hr />
            <Input {...data} {...data.bind("defaultValue")} />
        </div>
    )
}

export default Input;