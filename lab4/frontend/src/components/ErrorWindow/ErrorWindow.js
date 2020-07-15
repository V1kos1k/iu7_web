import React from 'react';
import Button from '../Button/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './ErrorWindow.css';


export default function ErrorWindow(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.changingTheErrorState();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="error-window__title">{props.type}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} buttonText="Закрыть" />
        </DialogActions>
      </Dialog>
    </div>
  );
}