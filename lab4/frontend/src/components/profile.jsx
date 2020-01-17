import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {action, computed, observable} from 'mobx';
import { Redirect } from "react-router-dom";

import Grid from '@material-ui/core/Grid';

import Loader from './loader.jsx';
import ProfileInfo from './profileInfo.jsx';
import ProfileAboutMe from './profileAboutMe.jsx'
import ProfileDesks from './profileDesks.jsx'

@inject("userStore", "deskStore", "chatStore")
@observer
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this._savedUsername = this.props.username;
  }

  @observable firstname;
  @observable lastname;
  @observable city;
  @observable aboutMe;
  @observable genre;
  @observable game;
  @observable avatar;
  @observable chatId;
  @observable alldesk = [];
  @observable createddesk = [];
  @observable waitdesk = [];

  @observable isUsername = true;

  @computed get username(){
      return this.props.username;
  }

  @action
  loadInfo() {
    this.props.userStore.loadInfo(this.username)
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
        if (err == 'not found') {
          this.isUsername = false;
        }
      }))
  }

  @action
  loadAvatar() {
    this.props.userStore.avatar(this.username)
      .then(action(res => {
        this.avatar = res.data;
        return res;
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  @action
  loadChatId() {
    this.props.chatStore.getChatId(this.username)
      .then(action(res => {
        this.chatId = res;
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  @action
  loadAllDeskInfo() {
    this.alldesk = [];
    this.waitdesk = []; 
    this.props.userStore.loadAllDeskInfo(this.username)
      .then(action(res => {
        let ind = 0;
        let indw = 0;
        res.map(data => {
          this.props.deskStore.image(data.desk_id)
                .then(action(res => {
                  if (data.isin == true) {
                    this.alldesk[ind++] = {
                      deskLabel: data.title,
                      isPrivate: data.is_private,
                      age: data.ages,
                      players: data.current_people,
                      genre: data.genres,
                      empty: data.max_people - data.current_people,
                      game: data.games,
                      deskId: data.desk_id,
                      image: res.data
                    } 
                  } else if (data.isin == false) {
                    this.waitdesk[indw++] = {
                      deskLabel: data.title,
                      isPrivate: data.is_private,
                      age: data.ages,
                      players: data.current_people,
                      genre: data.genres,
                      empty: data.max_people - data.current_people,
                      game: data.games,
                      deskId: data.desk_id,
                      image: res.data
                    } 
                  }
                })) .catch(action(err => {
                  console.log(err);
                }))  
          })})).catch(action(err => {
        console.log(err);
      }))
  }

  @action
  loadCreatedDeskInfo() {
    this.createddesk = [];
    this.props.userStore.loadCreatedDeskInfo(this.username)
      .then(action(res => {
        let ind = 0;
        res.map(data => {
          this.props.deskStore.image(data.desk_id)
            .then(action(res => {
                this.createddesk[ind++] = {
                  deskLabel: data.title,
                  isPrivate: data.is_private,
                  age: data.ages,
                  players: data.current_people,
                  genre: data.genres,
                  empty: data.max_people - data.current_people,
                  game: data.games,
                  deskId: data.desk_id,
                  image: res.data
                } 
            })) .catch(action(err => {
              console.log(err);
            }))  
          })})).catch(action(err => {
        console.log(err);
      }))
  }

  componentDidMount() {
    this.loadUserInfo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if(this._savedUsername !== this.username){
          this._savedUsername = this.username;
          this.loadUserInfo();
      }
  }

    loadUserInfo() {
      this.loadInfo();
      this.loadAvatar();
      this.loadAllDeskInfo();
      this.loadCreatedDeskInfo();

      if (this.username != this.props.userStore.username) {
        this.loadChatId();
      }
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.userStore.isLoading} >
        {!this.isUsername ? <Redirect to="/notFound" /> : null}
        <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}>
          <ProfileInfo isUsername={ this.username == this.props.userStore.username }
                    username={ this.username }
                    avatar={ this.avatar }
                    firstname={ this.firstname }
                    lastname={ this.lastname }
                    date={ this.date }
                    gender={ this.gender }
                    city={ this.city }
                    genre={ this.genre }
                    game={ this.game }
                    chatId={ this.chatId } />
          <Grid container
                justify="center"
                alignItems="flex-start"
                spacing={3}
                style={{ marginTop: 10 }}>
            <Grid item xs={8}>
              {console.log('ALL ' + this.alldesk)}
              <ProfileDesks isUsername={ this.username == this.props.userStore.username }
                            allDesk={ this.alldesk }
                            createdDesk={ this.createddesk }
                            waitDesk={ this.waitdesk }/>
            </Grid>
            <Grid item xs={3}>
              <ProfileAboutMe aboutMe={ this.aboutMe }/>
            </Grid>
          </Grid>
        </Grid>
        </Loader>
      </React.Fragment>
    )
  }
}
