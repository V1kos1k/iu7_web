import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

import Button from '../Button/Button';

import './Login.css';

export default function Login(props) {
  return(
    <div className={props.modifiers}>
    <Card className="login__card">
      <CardContent>
        <div>
          <p className="login__title">Вход</p>
          <div>
            <TextField
                label="Логин"
                margin="dense"
                variant="outlined"
                fullWidth
                className="login__text-field"
                inputProps={{ maxLength: 30 }}
                value = {props.username}
                onChange={props.handleOnInputUsername} />
          </div>
          <div >
            <FormControl 
                margin="dense" 
                variant="outlined"
                fullWidth
                className="login__text-field" >
              <InputLabel htmlFor="outlined-adornment-password">
                Пароль
              </InputLabel>
              <OutlinedInput
                  type={props.showPassword ? 'text' : 'password'}
                  value={props.password}
                  onChange={props.handleOnInputPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={props.handleClickShowPassword} >
                        {props.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  inputProps={{ maxLength: 30 }}
                  required
                  labelWidth={70} />
            </FormControl>
          </div>
          <Grid container justify="center">
            <Button buttonText="Войти"
                onClick={props.handlerOnSignIn} />
          </Grid>  
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
