import React from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props,ref) => {
    return (
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref = {ref} {...props.input} />
        </div>
        // <input  {...props.input} /> for the line mentioned refer video 135 06:32 min
    );
});

export default Input;