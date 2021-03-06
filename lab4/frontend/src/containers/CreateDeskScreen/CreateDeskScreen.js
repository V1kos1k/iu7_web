import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Redirect } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import ChipInput from 'material-ui-chip-input'

import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import ErrorWindow from '../../components/ErrorWindow/ErrorWindow';
import CustomizedSnackbars from '../../components/Snackbar/Snackbar';

import './CreateDeskScreen.css';


@inject("deskStore")
@observer
export default class CreateDeskScreen extends Component {
  constructor(props) {
    super(props);
    this.age = [20, 30];
  }

  file;
  @observable deskLabel = '';
  @observable isPrivate = false;
  @observable gender = 2;
  @observable age;
  @observable city  = '';
  genre;
  game;
  @observable maxPeople = '';
  @observable isCreate = false;
  @observable error = false;
  @observable msg = false;

  @observable img;
  type;

  @action
  handleUploadFile = (e) => {
    let reader = new FileReader();

    this.file = e.target.files[0];
    this.msg = "Картинка загружена! \n Не забудьте заполнить все поля."
    
    reader.onload = (e) => {
      this.img = e.target.result;
    }

    reader.readAsDataURL(e.target.files[0]);
  };


  @action
  handleOnInputDeskLabel = (e) => {
    this.deskLabel = e.target.value;
  }

  @action
  handleOnIsPrivate = (e) => {
    this.isPrivate = e.target.value;
  }

  @action
  handleOnGenderChange = (e) => {
    this.gender = e.target.value;
  }

  @action
  handleOnAgeChange = (e, v) => {
    this.age = v;
  }

  @action
  handleOnMaxPeopleChange = (e) =>{
    this.maxPeople = e.target.value;
  }

  @action
  handleOnInputCity = (e) => {
    this.city = e.target.value;
  }

  @action 
  handleAddGenre = (e) => {
    this.genre = e;
  }

  @action 
  handleAddGame = (e) => {
    this.game = e;
  }

  @action
  handlerOnAddDesk = () => {
    if (this.deskLabel && this.isPrivate &&
      this.gender && this.age && this.maxPeople && this.city && this.genre
      && this.game) {
        this.props.deskStore.createDesk(this.file, this.deskLabel, this.isPrivate, 
          this.gender, this.age, this.city, this.genre, this.game, this.maxPeople)
          .then(action(res => {
            this.isCreate = res;
          })) .catch(action(err => {
            console.log(err);
          }));
    } else {
      this.error = 'Должны быть заполнены все поля.';
      this.type = 'Ошибка!';
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
        <Loader isLoading={this.props.deskStore.isLoading}>
          {this.isCreate ? <Redirect to={`/desk/${this.isCreate}`} /> : null}
          {this.error ? <ErrorWindow message={this.error}
                                    type={this.type}
                                    changingTheErrorState={ (e) => this.changingTheErrorState(e) }/> : null}
          {this.msg ? <CustomizedSnackbars message={this.msg}
                                          changingTheMessageState={ (e) => this.changingTheMessageState(e) }/> : null}
          <Container modifiers="container_theme_create-desk">
            <Navbar isLogin={true}/>
            <Content modifiers="content_theme_create-desk">
            <Card className="create-desk__card">
            <CardContent>
              <Grid container alignItems="flex-start">
                <Grid item xs={3}>
                  <div>
                    {this.img ? <img className="create-desk__avatar" src={`${this.img}`} /> : <img className="create-desk__avatar" src={require('../../../static/img/missile.png')} />}
                  </div>
                  <div>
                    <input
                        accept="image/*"
                        className="create-desk__input-photo"
                        id="outlined-button-file"
                        type="file"
                        onChange={this.handleUploadFile}
                    />
                    <label align="center" htmlFor="outlined-button-file">
                    <Button variant="contained" component="span" className="create-desk__button-avatar">
                      Загрузить <br />
                      изображение
                    </Button>
                  </label>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <TextField
                        label="Название доски"
                        margin="dense"
                        fullWidth
                        inputProps={{ maxLength: 50 }}
                        value = {this.deskLabel}
                        onChange={this.handleOnInputDeskLabel}
                    />
                  </div>
                  <div>
                    <RadioGroup 
                        aria-label="position" 
                        name="position" 
                        value={this.isPrivate} 
                        onChange={this.handleOnIsPrivate} 
                        row
                    >
                      <FormControlLabel
                          value='0'
                          control={<Radio  />}
                          label="Публичная"
                          labelPlacement="end"
                          className="create-desk__label"
                      />
                      <FormControlLabel
                          value='1'
                          control={<Radio  />}
                          label="Приватная"
                          labelPlacement="end"
                          className="create-desk__label"
                      />
                    </RadioGroup>
                  </div>
                  <div className="create-desk__text"> 
                    <Typography 
                        color="textSecondary"
                        variant="body1"
                    >
                      Предпочтительный пол:
                    </Typography>
                    <RadioGroup 
                        aria-label="position" 
                        name="position" 
                        value={this.gender} 
                        onChange={this.handleOnGenderChange} 
                        row
                    >
                      <FormControlLabel
                          value='0'
                          control={<Radio  />}
                          label="Мужской"
                          labelPlacement="end"
                          className="create-desk__label"
                      />
                      <FormControlLabel
                          value='1'
                          control={<Radio  />}
                          label="Женский"
                          className="create-desk__label"
                          labelPlacement="end"
                      />
                      <FormControlLabel
                          value='2'
                          control={<Radio  />}
                          label="Неважно"
                          className="create-desk__label"
                          labelPlacement="end"
                      />
                    </RadioGroup>
                  </div>
                  <div className="create-desk__text">
                    <Typography 
                        color="textSecondary"
                        variant="body1"
                    >
                      Возраст:
                    </Typography>
                    <Slider
                        value={this.age}
                        color='secondary'
                        onChange={this.handleOnAgeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        marks={[{value: 0, label: '0'}, {value: 100, label: '100'}]}
                    />
                  </div>
                  <div>
                    <TextField 
                        type="number" 
                        label="Количество участников" 
                        inputProps={{step: 1, min: 2}}
                        value={this.maxPeople}
                        onChange={this.handleOnMaxPeopleChange}
                        fullWidth={true} 
                    />
                  </div>
                  <div>
                    <TextField
                        label="Введите город"
                        margin="dense"
                        fullWidth
                        inputProps={{ maxLength: 30 }}
                        value = {this.city}
                        onChange={this.handleOnInputCity}
                    />
                  </div>
                  <div>
                    <ChipInput
                        value={this.genre}
                        onChange = { ( chips ) => this.handleAddGenre ( chips ) }
                        fullWidth
                        label='Жанры'
                    />
                  </div>
                  <div>
                    <ChipInput
                        value={this.game}
                        onChange = { ( chips ) => this.handleAddGame ( chips ) }
                        fullWidth
                        label='Игры'
                    />
                  </div>
                  <div>
                    <Grid align="center">
                      <Button 
                          variant="contained"
                          className="create-desk__button"
                          onClick={this.handlerOnAddDesk}
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