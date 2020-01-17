import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import { withTheme } from '@material-ui/styles';
import { height } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.25),
    boxShadow: 'none',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    '&::-webkit-scrollbar': {
      height: '0.2em'
    }
  },
  chip: {
    margin: theme.spacing(0.25),
  },
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {props.tags.map((data, index) => {
        return (
          <Chip
          key={index}
          label={data}
          className={classes.chip}
        />
        );
      })}
    </Paper>
  );
}