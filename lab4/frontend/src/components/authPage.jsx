import React, { Component } from 'react';
import Login from './login.jsx';
import Registration from './registration.jsx';
import Loader from './loader.jsx';
import Grid from '@material-ui/core/Grid';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

import ErrorWindow from './errorWindow.jsx';

@inject("authStore", "socketStore")
@observer
export default class AuthPage extends Component {
  constructor(props) {
    super(props);
  }

  @observable username;
  @observable password;
  @observable showPassword = false;

  @observable usernameReg;
  @observable emailReg;
  @observable passwordReg;
  @observable dateReg = new Date().toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
  genderReg;
  @observable showPasswordReg = false;
  @observable error = false;
  type;

  @action 
  handleOnInputUsername = (e) => {
    this.username = e.target.value;
  };

  @action 
  handleOnInputPassword = (e) => {
    this.password = e.target.value;
  };

  @action 
  handleClickShowPassword = () => {
    this.showPassword = !this.showPassword;
  };

  @action 
  handlerOnSignIn = () => {
    if (this.username && this.password) {
      this.props.authStore.login(this.username,this.password).then(action(res => {
        this.props.socketStore.connect(this.username);
      })).catch(action(err => {
        this.error = "Пожалуйста, проверьте правильность написания логина и пароля.";
        this.type = 'Ошибка!';
      }));
    } else {
      this.error = "Должны быть заполнены все поля.";
      this.type = 'Ошибка!';
    }
  };


  @action 
  handleOnInputUsernameReg = (e) => {
    this.usernameReg = e.target.value;
  };

  @action
  handleOnInputEmailReg = (e) => {
    this.emailReg = e.target.value;
  };

  @action 
  handleOnInputPasswordReg = (e) => {
    this.passwordReg = e.target.value;
  };

  @action 
  handleClickShowPasswordReg = () => {
    this.showPasswordReg = !this.showPasswordReg;
  };
  
  @action
  handleDateChangeReg = date => {
    try {
      this.dateReg = new Date(date  - date.getTimezoneOffset() * 60000);
    } catch(err) {
      console.log(err);
    }
  };

  @action
  handleGenderChangeReg = event => {
    this.genderReg = event.target.value;
  };

  @action 
  handlerOnSignUp = () => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (/\s/.test(this.username))
    {
      this.error = "Логин не должен содержать пробелов.";
      this.type = 'Ошибка!';
    } else {
      if (this.usernameReg && reg.test(this.emailReg) && this.passwordReg && this.genderReg) {
        this.props.authStore.registration(this.usernameReg, 
                                      this.emailReg, 
                                      this.passwordReg, 
                                      this.dateReg.toISOString().slice(0, 10).replace('T', ' ').split(' ')[0], 
                                      this.genderReg)
        .then(action(res => {
          this.props.socketStore.connect(this.usernameReg);
        })).catch(action(err => {
          this.error = "Данный логин или email уже используются.";
          this.type = 'Ошибка!';
        }));
      } else {
        this.error = "Проверьте корректность данных.";
        this.type = 'Ошибка!';
      }
    }
  };

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }


  render() {
    return (
      <React.Fragment>
        <Loader isLoading={this.props.authStore.isLoading} >
        {this.error ? <ErrorWindow message={this.error}
                                  type={this.type}
                                  changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6}>
            <Card style={{maxWidth: 600, maxHeight: 600, backgroundColor: "#FCEAEA"}}>
              <CardContent>
                <Typography 
                    color="textPrimary" 
                    align="center"
                    style={{lineHeight: "65px", fontSize: "22px", padding: "46px"}}>
                      TableHub – идеальное место, где 
                      можно найти не только человека или
                      компанию, с которой вы с радостью 
                      проведете не один вечер за вашей 
                      любимой настольной игрой, но и 
                      новых друзей.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="flex-end"
                spacing={3}>
              <Grid item>
                
                <Login username={ this.username }
                        password={ this.password }
                        showPassword={ this.showPassword }
                        handleOnInputUsername={ (e) => this.handleOnInputUsername(e) }
                        handleOnInputPassword={ (e) => this.handleOnInputPassword(e) }
                        handleClickShowPassword={ (e) => this.handleClickShowPassword(e) }
                        changingTheErrorState={ (e) => this.changingTheErrorState(e) }
                        handlerOnSignIn={ (e) => this.handlerOnSignIn(e) } />
              </Grid>
              <Grid item>
                <Registration username={ this.usernameReg }
                                email={ this.emailReg }
                                password={ this.passwordReg }
                                showPassword={ this.showPasswordReg }
                                date={ this.dateReg }
                                gender={ this.genderReg }
                                handleOnInputUsername={ (e) => this.handleOnInputUsernameReg(e) }
                                handleOnInputEmail={ (e) => this.handleOnInputEmailReg(e) }
                                handleOnInputPassword={ (e) => this.handleOnInputPasswordReg(e) }
                                handleClickShowPassword={ (e) => this.handleClickShowPasswordReg(e) }
                                handleDateChange={ (e) => this.handleDateChangeReg(e) }
                                handleGenderChange={ (e) => this.handleGenderChangeReg(e) }
                                changingTheErrorState={ (e) => this.changingTheErrorState(e) }
                                handlerOnSignUp={ (e) => this.handlerOnSignUp(e) } />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Loader>
      </React.Fragment>
    );
  }
}