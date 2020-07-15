import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { Redirect } from "react-router-dom";
import Card from '@material-ui/core/Card';

import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import DeskInfo from '../../components/DeskInfo/DeskInfo';
import Chat from '../../components/Chat/Chat';
import ErrorWindow from '../../components/ErrorWindow/ErrorWindow';

import './DeskScreen.css';

@inject("deskStore", "userStore", "socketStore")
@observer
export default class DeskScreen extends Component {
  constructor(props) {
    super(props);
  }

  @observable deskId = this.props.deskId;
  @observable title;
  @observable isPrivate;
  @observable ages;
  @observable city;
  @observable currentPeople;
  @observable games;
  @observable gender;
  @observable genre;
  @observable maxPeople;
  @observable ownerLogin;
  @observable image;
  @observable chatId;
  @observable input = '';

  @observable members;
  @observable isMember = false;
  @observable isCreaterDelete = false;

  @observable error = false;
  type;
  @observable deleteAttempt = false;
  
  @computed 
  get getAllMessage() {
    return this.props.socketStore.allChatMessages;
  }

  @action
  loadDeskInfo() {
    this.props.deskStore.loadDeskInfo(this.deskId)
      .then(action(res => {
        console.log(res);
        this.title = res.title;
        this.isPrivate = res.is_private;
        this.ages = res.ages;
        this.city = res.city;
        this.currentPeople = res.current_people;
        this.games = res.games;
        this.chatId = res.chat_id;
        if (res.gender == 0) {
          this.gender = 'Мужской';
        } else if (res.gender == 1) {
          this.gender = 'Женский';
        } else {
          this.gender = 'Любой';
        }
        this.genre = res.genres;
        this.maxPeople = res.max_people;
        this.ownerLogin = res.owner_login;

        this.props.socketStore.getAllMessage(res.chat_id);
      })) .catch(action(err => {
        console.log(err);
        this.deskId = false; // не существует => перенаправление на страницу notFound
      }))
  }

  @action
  loadDeskImage() {
    this.props.deskStore.loadDeskImage(this.deskId)
      .then(action(res => {
        console.log(res);
        this.image = res.data;
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  loadDeskMembers() {
    this.props.deskStore.loadDeskMembers(this.deskId)
      .then(action(res => {
        console.log(res);
        this.members = res;
        res.map(item => {
          if (item.login == this.props.userStore.username) {
            this.isMember = true;
          }
        });
      })) .catch(action(err => {
        console.log(err);
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
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.input != '') {
        this.props.socketStore.sendMessageDesk(this.input, this.chatId, this.props.userStore.username);
        this.input = '';
      }
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


  loadInfo() {
    this.loadDeskInfo();
    this.loadDeskImage();
    this.loadDeskMembers();
  }

  componentDidMount() {
    this.loadInfo();
  }

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.deskStore.isLoading} >
          <Container>
            {!this.deskId ? <Redirect to="/notFound" /> : null}
            {this.isCreaterDelete ? <Redirect to="/" /> : null}
            {this.error ? <ErrorWindow message={this.error}
                                        type={this.type}
                                        changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
            <Navbar isLogin={true}/>
            <Content modifiers="content_theme_desk">
              <div className = "desk__desk_info">
              <DeskInfo title={this.title}
                        isPrivate={ this.isPrivate }
                        ages={ this.ages }
                        city={ this.city }
                        currentPeople={ this.currentPeople }
                        game={ this.games }
                        gender={ this.gender }
                        genre={ this.genre }
                        maxPeople={ this.maxPeople }
                        ownerLogin={ this.ownerLogin }
                        image={ this.image }
                        members={ this.members }
                        isMember={ this.isMember } 
                        handleOnClickJoin={ (e) => this.handleOnClickJoin(e) }
                        handleOnClickDelete={ (e) => this.handleOnClickDelete(e) } />
                </div>
                <div className="desk__chat">
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
                            <Card className = "desk__chat_lock">
                                <h4 className = "desk__chat_warn">Чат станет доступным после вступления</h4>
                                <img src={require('../../../static/img/lock.png')} className = "desk__chat_image"/>
                            </Card>
                    }
                </div>

            </Content>
          </Container>
        </Loader>
      </React.Fragment>
    );
  }
}