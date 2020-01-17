import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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

const styles = {
  registration__button: {
    minWidth: 125,
    align: "center",
    marginTop: 15,
    backgroundColor: "#EB5757",
    borderRadius: 10,
    color: "white",
    '&:hover': {
      backgroundColor: "#EB7D7D",
      color: '#FFF',
    },
    fontStyle: "normal",
    fontWeight: "bold",  
    textTransform: 'capitalize',
    fontSize: 16,
  },
  registration__card: {
    minWidth: 400,
    backgroundColor: "#FCEAEA",
  },
}


export default function Registration(props) {
    return(
    <Card style={styles.registration__card}>
      <CardContent>
        <div>
          <Typography 
            color="textPrimary" 
            align="center"
            variant="h5">
            Регистрация
          </Typography>
          <div>
            <TextField
              label="Логин"
              margin="dense"
              variant="outlined"
              fullWidth
              style={{ 
                backgroundColor: "white"
              }}
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
              style={{ 
                backgroundColor: "white"
              }}
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
              style={{ 
                backgroundColor: "white"
              }}
              >
              <InputLabel htmlFor="outlined-adornment-password">
                  Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
            <Typography 
              color="textSecondary"
              variant="h6">
              Дата рождения
            </Typography>
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
          <Typography 
              color="textSecondary"
              variant="h6">
              Пол
            </Typography>
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
          <Button variant="contained"
            style={styles.registration__button}
            onClick={props.handlerOnSignUp}
          >
            Зарегистрироваться
          </Button>
        </Grid>  
        </div>
      </CardContent>
    </Card>
    )
}