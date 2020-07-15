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
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import './Registration.css';

import Button from '../../components/Button/Button';


export default function Registration(props) {
    return(
    <Card className="registration__card">
      <CardContent>
        <div>
          <p className="registration__title">Регистрация</p>
          <div>
            <TextField
                label="Логин"
                margin="dense"
                variant="outlined"
                fullWidth
                className="registration__text-field"
                inputProps={{ maxLength: 30 }}
                value = {props.username}
                onChange={props.handleOnInputUsername}
              />
          </div>
          <div>
            <TextField
              label="Email"
              margin="dense"
              variant="outlined"
              fullWidth
              className="registration__text-field"
              inputProps={{ maxLength: 30 }}
              value = {props.email}
              onChange={props.handleOnInputEmail}
            />
          </div>
          <div >
            <FormControl 
              margin="dense" 
              variant="outlined"
              fullWidth
              className="registration__text-field"
              >
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
                    onClick={props.handleClickShowPassword}
                  >
                  {props.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
                }
                inputProps={{ maxLength: 30 }}
                labelWidth={70}
              />
            </FormControl>
          </div>
          <div>
            <p className="registration__text">Дата рождения</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around" alignItems="flex-start">
                <KeyboardDatePicker
                  disableFuture
                  disableToolbar
                  variant="inline"
                  format="yyyy/MM/dd"
                  value={props.date}
                  onChange={props.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <div>
          <p className="registration__text">Пол</p>
          <RadioGroup aria-label="position" 
                      name="position" 
                      value={props.gender} 
                      onChange={props.handleGenderChange} 
                      row
          >
            <FormControlLabel
              value='0'
              control={<Radio color="primary" />}
              label="Мужской"
              labelPlacement="end"
            />
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Женский"
              labelPlacement="end"
            />
          </RadioGroup>
          </div>
          <Grid container justify="center">
          <Button buttonText="Зарегистрироваться"
                  onClick={props.handlerOnSignUp} />
        </Grid>  
        </div>
      </CardContent>
    </Card>
    )
}