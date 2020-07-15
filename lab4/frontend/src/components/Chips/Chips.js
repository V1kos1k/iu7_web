import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import './Chips.css';

export default function ChipsArray(props) {
  return (
    <Paper className="сhip__root">
      {props.tags.map((data, index) => {
        return (
          <Chip
          key={index}
          label={data}
          className="chip"
        />
        );
      })}
    </Paper>
  );
}