import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChatItem from '../ChatItem/ChatItem';

import './ChatList.css';

@inject('chatStore', 'socketStore')
@observer
export default class ChatList extends Component {
  constructor(props) {
    super(props);
  }

  @computed 
  get unreadMessage() {
    return this.props.socketStore.unreadMessage;
  }

  renderChatItem() {
    return this.props.chatStore.chats.map((data, index) => {
      let unread = this.unreadMessage.filter(item => item.chat_id == data.chat_id).length;

      return(
        <ChatItem data={data} unread={unread} key={index}/>
      );
    });
  }

  renderChatItemSearch(data, index) {
    let unread = this.unreadMessage.filter(item => item.chat_id == data.chat_id).length;

    return(
      <ChatItem data={data} unread={unread} key={index}/>
    );
  }

  render() {
    return(
      <List className="listScroll" className="chat__list">
        <ListItem>
          <input className="chat__input" 
              placeholder="Поиск" 
              type="text"
              value={this.props.searchInput}
              onChange={this.props.handleOnInputSearch}
              onKeyDown={this.props.handleKeyDownSearch}
          />
        </ListItem>
        {this.props.chatStore.chats.length ?
          (this.props.searchClick ?  
            this.props.searchArray.map((data, index) => (
              this.renderChatItemSearch(data, index)
          ))
          : 
            this.renderChatItem()
          )
        : <h4 className="chat__text">У тебя пока нет чатов</h4>}
      </List> 
    );
  }
}
