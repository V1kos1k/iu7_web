import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {action, computed, observable} from 'mobx';
import { Redirect } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

import Loader from './loader.jsx';
import DeskInfo from './deskInfo.jsx';
import Chat from './chat.jsx';
import ErrorWindow from './errorWindow.jsx';

const styles = {
  desk__chat_card: {
    heigth: '50%',
  },
  chat__warn: {
    color: 'grey',
    textAlign: 'center',
    marginTop: '70%',
  },
}

@inject("deskStore", "userStore", "socketStore")
@observer
export default class DeskPage extends Component {
  constructor(props) {
    super(props);
  }

  @observable deskId = window.location.href.split('/')[4];
  @observable title;
  @observable isPrivate;
  @observable ages;
  @observable chatId;
  @observable city;
  @observable currentPeople;
  @observable game;
  @observable gender;
  @observable genre;
  @observable maxPeople;
  @observable ownerLogin;
  @observable image;

  @observable isMember = false;
  @observable isCreaterDelete = false;
  @observable members;

  @observable error = false;
  type;
  @observable deleteAttempt = false;

  @observable input = ''

  @computed 
  get getAllMessage() {
    return this.props.socketStore.allChatMessages;
  }

  @action
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.input != '') {
        this.props.socketStore.sendMessageDesk(this.input, this.chatId, this.props.userStore.username);
        this.input = '';
      }
    }
  }

  @action 
  handleOnClickJoin() {
    this.props.deskStore.joinTheBoard(this.deskId)
      .then(action(res => {
        if (res.isIn == true) {
          this.isMember = true;
          this.loadDeskMembers(this.deskId);
          this.currentPeople += 1;
        } else {
          this.error = 'Это приватная доска, твоя заявка на вступление отправлена.';
          this.type = 'Предупреждение'
        }
      })) .catch(action(err => {
        if (err == 'not found') {
          this.deskId = false;
        }
        this.error = err;
        this.type = 'Ошибка!';
      }))
  }

  @action
  handleOnClickDelete() {
    if ((this.ownerLogin == this.props.userStore.username) && !this.deleteAttempt) {
      this.error = 'Если ты выйдешь, то доска удалится, так как ты ее создатель...(';
      this.type = 'Предупреждение';
      this.deleteAttempt = true;
    } else {
      this.props.deskStore.outOfTheBoard(this.deskId, this.props.userStore.username)
        .then(action(res => {
          if (this.ownerLogin == this.props.userStore.username) {
            this.isCreaterDelete = true;
          }
          this.isMember = false;
          this.loadDeskMembers(this.deskId);
          this.currentPeople -= 1;
        })) .catch(action(err => {
          console.log(err);
        }))
    }
  }

  @action
  handleOnInputMessage = (e) => {
    this.input = e.target.value;
  }

  @action
  handleOnClickSendMessage = (e) => {
    if (this.input != '') {
      this.props.socketStore.sendMessageDesk(this.input, this.chatId, this.props.userStore.username);
      this.input = '';
    }
  }

  @action
  loadDeskInfo() {
    this.props.deskStore.loadDeskInfo(this.deskId)
      .then(action(res => {
        this.title = res.title;
        this.isPrivate = res.is_private;
        this.ages = res.ages;
        this.chatId = res.chat_id;
        this.city = res.city;
        this.currentPeople = res.current_people;
        this.game = res.games;
        if (res.gender == 0) {
          this.gender = 'Мужской';
        } else if (res.gender == 1) {
          this.gender = 'Женский'
        } else {
          this.gender = 'Любой';
        }
        this.genre = res.genres;
        this.maxPeople = res.max_people;
        this.ownerLogin = res.owner_login;

        this.props.socketStore.getAllMessage(res.chat_id);
      })) .catch(action(err => {
        this.deskId = false;
      }))
  }

  @action
  loadDeskImage() {
    this.props.deskStore.image(this.deskId)
      .then(action(res => {
        this.image = res.data;
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  @action
  loadDeskMembers() {
    this.props.deskStore.loadDeskMembers(this.deskId)
      .then(action(res => {
        this.members = res;
        res.map(item => {
          if (item.login == this.props.userStore.username) {
            this.isMember = true;
          }
        })
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  loadDeskAllInfo() {
    this.loadDeskInfo();
    this.loadDeskImage();
    this.loadDeskMembers();
  }

  componentDidMount() {
    this.loadDeskAllInfo();
  }

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }

  sendMessage = () => {
    this.props.socketStore.sendMessage('sleep');
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.deskStore.isLoading}>
          {!this.deskId ? <Redirect to="/notFound" /> : null}
          {this.isCreaterDelete ? <Redirect to="/" /> : null}
          {this.error ? <ErrorWindow message={this.error}
                                    type={this.type}
                                  changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
          <Box display="flex"
              alignItems="center">
            <Box style={{ width: '70%'}} p={3}>
              <DeskInfo title={ this.title }
                        isPrivate={ this.isPrivate }
                        ages={ this.ages }
                        city={ this.city }
                        currentPeople={ this.currentPeople }
                        game={ this.game }
                        gender={ this.gender }
                        genre={ this.genre }
                        maxPeople={ this.maxPeople }
                        ownerLogin={ this.ownerLogin }
                        image={ this.image }
                        members={ this.members }
                        isMember={ this.isMember }
                        handleOnClickJoin={ (e) => this.handleOnClickJoin(e)}
                        handleOnClickDelete={ (e) => this.handleOnClickDelete(e) }s
              />
            </Box>
            <Box style={{ height: 660, paddingTop: '1%', width: '30%' }}>
              {this.isMember?
                                this.chatId ? <Chat 
                                    avatar={ this.image }
                                    title="Чатик"
                                    yourUsername={ this.props.userStore.username }
                                    input={ this.input }
                                    chatId={ this.chatId }
                                    handleOnInputMessage={ (e) => this.handleOnInputMessage(e) }
                                    handleOnClickSendMessage={ (e) => this.handleOnClickSendMessage(e) }
                                    getAllMessage={ this.getAllMessage }
                                    handleKeyDown={ (e) => this.handleKeyDown(e) }
                                    /> : null
                                
                            :
                            <Card style={{ width: '100%', height: '100%', backgroundColor: '#e6e6e6' }}>
                                <h4 style={styles.chat__warn}>Чат станет доступным после вступления</h4>
                                <img src={require('../img/lock.png')} style = {{height: '10%', marginLeft: '40%'}}/>
                            </Card>
              }
            </Box>
          </Box>
        </Loader>
      </React.Fragment>
    );
  }
}