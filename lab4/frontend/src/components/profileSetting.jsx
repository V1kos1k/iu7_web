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

import Loader from './loader.jsx'
import ErrorWindow from './errorWindow.jsx';
import CustomizedSnackbars from './Snackbars.jsx'

const styles = {
  input: {
    display: 'none',
  },
  profile__button: {
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
  profile__card: {
    minWidth: '70%',
    backgroundColor: "#fffff",
    marginTop: '5%',
  },
  profile__avatar: {
    width: 140,
    height: 140,
  },
  profile__buttonAvatar: {
    fontSize:14,
    marginTop: 3,
  }
}

@inject("userStore")
@observer
export default class ProfileSetting extends Component {
  constructor(props) {
    super(props);
  }

  @observable isCurrentUser = true;
  file;
  @observable firstname;
  @observable lastname;
  @observable city;
  @observable aboutMe;
  @observable genre;
  @observable game;
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
        {!this.isCurrentUser ? <Redirect to="/notFound" /> : null}
        {this.error ? <ErrorWindow message={this.error}
                                    type={this.type}
                                    changingTheErrorState={ (e) => this.changingTheErrorState(e) } /> : null}
        {this.msg ? <CustomizedSnackbars message={this.msg}
                                          changingTheMessageState={ (e) => this.changingTheMessageState(e) } /> : null}
        <Grid container justify="center">
        <Card style={styles.profile__card}>
          <CardContent>
            <Grid container spacing={3} alignItems="center" alignItems="flex-start">
              <Grid item xs={3}>
                <div>
                  {this.avatar ? <Avatar style={styles.profile__avatar} src={"data:image/png;base64," + `${this.avatar}`} /> : <AccountCircleOutlinedIcon style={styles.profile__avatar}/>}
                </div>
                <div>
                  <input
                    accept="image/*"
                    style={styles.input}
                    id="outlined-button-file"
                    type="file"
                    onChange={this.handleUploadFile}
                  />
                  <label align="center" htmlFor="outlined-button-file">
                    <Button variant="outlined" component="span" style={styles.profile__buttonAvatar}>
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
                    style={{ 
                      backgroundColor: "white"
                    }}
                    inputProps={{ maxLength: 30 }}
                    value = {this.firstname}
                    defaultValue=' '
                    onChange={this.handleOnInputFirstName}
                />
              </div>
              <div>
                <TextField
                    label="Фамилия"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    style={{ 
                      backgroundColor: "white"
                    }}
                    inputProps={{ maxLength: 30 }}
                    value = {this.lastname}
                    defaultValue=' '
                    onChange={this.handleOnInputLastName}
                />
              </div>
              <div>
                <TextField
                    label="Город"
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    style={{ 
                      backgroundColor: "white"
                    }}
                    inputProps={{ maxLength: 30 }}
                    value = {this.city}
                    defaultValue=' '
                    onChange={this.handleOnInputCity}
                />
              </div>
              <div>
                <TextField
                    label="О себе"
                    multiline
                    rowsMax="4"
                    value={this.aboutMe}
                    defaultValue=' '
                    onChange={this.handleOnInputAboutMe}
                    style={{ width: '100%' }}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <TextField
                    label="Любимые жанры"
                    multiline
                    rowsMax="3"
                    value={this.genre}
                    defaultValue=' '
                    onChange={this.handleOnInputGenre}
                    style={{ width: '100%' }}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <TextField
                    label="Любимые игры"
                    multiline
                    rowsMax="3"
                    value={this.game}
                    defaultValue=' '
                    onChange={this.handleOnInputGame}
                    style={{ width: '100%' }}
                    margin="normal"
                    variant="outlined"
                  />
              </div>
              <div>
                <Grid align="center">
                  <Button 
                      variant="contained"
                      style={styles.profile__button}
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
        </Grid>
        </Loader>
      </React.Fragment>
    );
  }
}