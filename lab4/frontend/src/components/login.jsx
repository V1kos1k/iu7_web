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

import Grid from '@material-ui/core/Grid';

const styles = {
  login__button: {
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
  login__card: {
    minWidth: 400,
    backgroundColor: "#FCEAEA",
  }
}

export default function Lofin(props) {
    return(
    <div>
    <Card style={styles.login__card}>
      <CardContent>
        <div>
          <Typography 
            color="textPrimary" 
            align="center"
            variant="h5">
            Вход
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
                required
                labelWidth={70}
              />
            </FormControl>
          </div>
          <Grid container justify="center">
          <Button variant="contained"
            style={styles.login__button}
            onClick={props.handlerOnSignIn}
          >
            Войти
          </Button>
        </Grid>  
        </div>
      </CardContent>
    </Card>
    </div>
    )
  }
