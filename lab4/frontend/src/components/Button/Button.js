import React from 'react';
import classnames from 'classnames';
import './Button.css';

export default function Button(props) {
  return(
    <button onClick={() => { props.onClick ? props.onClick() : null }}
            name={props.name ? props.name : ''}
            className={classnames('button', props.modifiers)}>{props.buttonText}{props.children}</button>
  );
}
