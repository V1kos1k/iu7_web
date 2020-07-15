import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Redirect } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import TextField from "@material-ui/core/TextField";

import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import ErrorWindow from '../../components/ErrorWindow/ErrorWindow';
import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

import './UserSettingsScreen.css';


@inject("userStore")
@observer
export default class UserSettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  @observable isCurrentUser = true;
  file;
  @observable firstname = '';
  @observable lastname = '';
  @observable city = '';
  @observable aboutMe = '';
  @observable genre = '';
  @observable game = '';
  @observable error = false;
  @observable avatar;
  @observable msg=false;
  type;

  @action
  handleUploadFile = (e) => {
    let reader = new FileReader();

    this.file = e.target.files[0];
    this.msg = "Картинка загружена! \n Не забудьте сохранить)"

    reader.onload = (e) => {
      this.avatar = e.target.result.split(',')[1];
    }

    reader.readAsDataURL(e.target.files[0]);
  };


  @action
  handleOnInputFirstName = (e) => {
    this.firstname = e.target.value;
  };

  @action
  handleOnInputLastName = (e) => {
    this.lastname = e.target.value;
  };

  @action
  handleOnInputCity = (e) => {
    this.city = e.target.value;
  };

  @action
  handleOnInputAboutMe = (e) => {
    this.aboutMe = e.target.value; 
  };

  @action
  handleOnInputGenre = (e) => {
    this.genre = e.target.value;
  };

  @action
  handleOnInputGame = (e) => {
    this.game = e.target.value;
  };

  @action
  handlerOnSaveSettings = () => {
    this.props.userStore.saveSettings(this.file, this.firstname, this.lastname, 
        this.date, this.gender, this.city, this.aboutMe, this.genre, this.game)
      .then(action(res => {
          this.msg = "Данные сохранены!"
          this.loadAvatar();
      })) .catch(action(err => {
          this.error = "Проверьте корректность данных";
          this.type = 'Ошибка!';
      }));
  };

  @action
  loadInfo() {
    this.props.userStore.loadInfo(this.props.userStore.username)
      .then(action(res => {
        this.firstname = res.name;
        this.lastname = res.surname;
        this.date = res.date_birth;
        this.gender = res.gender;
        this.city = res.city;
        this.aboutMe = res.about_me;
        this.genre = res.favorite_genres.join(', ');
        this.game = res.favorite_games.join(', ');
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  @action
  loadAvatar() {
    this.props.userStore.avatar(this.props.userStore.username)
      .then(action(res => {
        this.avatar = res.data;
        return res;
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  componentDidMount() {
    if (this.props.userStore.username != window.location.href.split('/')[4]) {
      this.isCurrentUser = false;
    } else {
      this.isCurrentUser = true;
      this.loadInfo();
      this.loadAvatar();
    }
  }

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }

  @action
  changingTheMessageState = () => {
    this.msg = !this.msg;
  }


  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.userStore.isLoading} >
          <Container >
        <Navbar isLogin={true}/>
        <Content modifiers="content_theme_user">
        {!this.isCurrentUser ? <Redirect to="/notFound" /> : null}
        {this.error ? <ErrorWindow message={this.error}
                                    type={this.type}
                                    changingTheErrorState={ (e) => this.changingTheErrorState(e) } /> : null}
        {this.msg ? <CustomizedSnackbars message={this.msg}
                                          changingTheMessageState={ (e) => this.changingTheMessageState(e) } /> : null}
        <Card className="user-settings__card">
          <CardContent className="user-settings__card-content">
            <Grid container spacing={3} alignItems="center" alignItems="flex-start">
              <Grid item xs={3}>
                  {this.avatar ? <Avatar className="user-settings__avatar" src={"data:image/png;base64," + `${this.avatar}`} /> : <AccountCircleOutlinedIcon className="user-settings__avatar"/>}
                <div>
                  <input
                    accept="image/*"
                    className="user-settings__input-photo"
                    id="outlined-button-file"
                    type="file"
                    onChange={this.handleUploadFile}
                  />
                  <label align="center" htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" className="user-settings__button-avatar">
                      Загрузить <br />
                      изображение
                    </Button>
                  </label>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div>
                <TextField
                    label="Имя"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    value = {this.firstname}
                    onChange={this.handleOnInputFirstName}
                />
              </div>
              <div>
                <TextField
                    label="Фамилия"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    value = {this.lastname}
                    onChange={this.handleOnInputLastName}
                />
              </div>
              <div>
                <TextField
                    label="Город"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    inputProps={{ maxLength: 30 }}
                    value = {this.city}
                    onChange={this.handleOnInputCity}
                />
              </div>
              <div>
                <TextField
                    label="О себе"
                    multiline
                    rowsMax="4"
                    fullWidth
                    value={this.aboutMe}
                    onChange={this.handleOnInputAboutMe}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <TextField
                    label="Любимые жанры"
                    multiline
                    rowsMax="3"
                    fullWidth
                    value={this.genre}
                    onChange={this.handleOnInputGenre}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <TextField
                    label="Любимые игры"
                    multiline
                    rowsMax="3"
                    fullWidth
                    value={this.game}
                    onChange={this.handleOnInputGame}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <Grid align="center">
                  <Button 
                      variant="contained"
                      className="user-settings__button"
                      onClick={this.handlerOnSaveSettings}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        </Content>
        </Container>
        </Loader>
      </React.Fragment>
    );
  }
}