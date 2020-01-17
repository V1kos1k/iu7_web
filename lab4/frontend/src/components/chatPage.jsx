import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import { Redirect } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';

import Loader from './loader.jsx';
import Chat from './chat.jsx';
import ChatList from './chatList.jsx';

const styles = {
  chat__box: {
    paddingRight: '2%',
  },
  chat__card_warn: {
    height: 660,
  },
  chat__warn: {
    color: 'grey',
    textAlign: 'center',
  },
}

@inject('chatStore', 'userStore', 'socketStore')
@observer
export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this._savedChatId = this.props.chatId;
  }

  @observable avatar;
  @observable avatars = [];
  @observable username;
  @observable input = '';
  @observable currentUser = true;
  @observable searchInput = '';
  @observable searchArray = [];
  @observable searchClick = false;

  @computed get chatId(){
    return this.props.chatId;
  }

  @computed 
  get getAllMessage() {
    return this.props.socketStore.allChatMessages;
  }

  @action
  handleOnInputMessage = (e) => {
    this.input = e.target.value;
  }

  @action
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (this.input != '') {
        this.props.socketStore.sendMessage(this.input, this.props.chatId, this.props.userStore.username);
        this.input = '';
      }
    }
  }

  @action
  handleOnInputSearch = (e) => {
    this.searchInput = e.target.value;
  } 

  @action
  handleKeyDownSearch = (e) => {
    if (e.key === 'Enter') {
      if (this.searchInput != '') {
        this.searchArray = [];
        this.props.chatStore.chats.map(data => {
          if (data.user.username == this.searchInput){
            this.searchArray.push(data);
          }
        })
        this.searchClick = true;
      } else {
        this.searchClick = false;
      }
    }
  }

  @action
  handleOnClickSendMessage = (e) => {
    if (this.input != '') {
      this.props.socketStore.sendMessage(this.input, this.props.chatId, this.props.userStore.username);
      this.input = '';
    }
  }

  @action
  loadAvatar() {
    this.props.userStore.avatar(this.username)
      .then(action(res => {
        this.avatar = res.data;
      })) .finally(action(() => {
        this.props.socketStore.getAllMessage(this.props.chatId);
      }))
  }

  @action
  loadInfo() {
    this.props.chatStore.getChatUsers(this.props.chatId)
      .then(action(res => {
        let currentUser = false;
        for (let key in res) {
          if (res[key].login != this.props.chatStore.username) {
            this.username = res[key].login;
          } else {
            currentUser = true;
          }
        }
        if (!currentUser) {
          this.currentUser = false;
        }
        this.loadAvatar();
      })) .catch(action(err => {
        this.currentUser = false;
      }))
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this._savedChatId !== this.chatId){
        this._savedChatId = this.chatId;
        this.loadAllInfo();
    }
  }

  loadAllInfo() {
    if (this.props.chatId) {
      this.loadInfo();
    }
  }

  componentDidMount() {
    this.loadAllInfo();
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.chatStore.isLoading}>
          {!this.currentUser ? <Redirect to="/notFound" /> : null}
          <Box display='flex'
                alignItems='flex-start'
                justifyContent='center'
                style={{ marginTop: '2%' }}
                >
            <Box style={styles.chat__box}>
              <ChatList searchInput={ this.searchInput }
                        searchClick={ this.searchClick }
                        searchArray={ this.searchArray }
                        handleOnInputSearch={ (e) => this.handleOnInputSearch(e) }
                        handleKeyDownSearch={ (e) => this.handleKeyDownSearch(e) } />
            </Box>
            <Box style={{ width: '70%', height: '70%' }}>
              {this.props.chatId ? <Chat avatar={ this.avatar }
                                    title={ this.username }
                                    yourUsername={ this.props.chatStore.username }
                                    input={ this.input }
                                    chatId={ this.props.chatId }
                                    handleOnInputMessage={ (e) => this.handleOnInputMessage(e) }
                                    handleOnClickSendMessage={ (e) => this.handleOnClickSendMessage(e) }
                                    getAllMessage={ this.getAllMessage }
                                    handleKeyDown={ (e) => this.handleKeyDown(e) }
                                    /> : 
                                    
                                    
                                    <Card style={styles.chat__card_warn}>
                                      <h4 style={styles.chat__warn}>Выбери чат</h4>
                                      <img src={require('../img/chat.png')} style = {{height: '80%', marginLeft: '20%'}}/>
                                  </Card>
                    }
            </Box>
          </Box>
        </Loader>
      </React.Fragment>
    );
  }
}