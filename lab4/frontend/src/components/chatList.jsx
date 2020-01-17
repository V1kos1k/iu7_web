import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ChatItem from './chatItem.jsx';

const styles = {
  chat__list: {
    width: '100%',
    maxHeight: 660,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 0,
    overflow: 'auto',
  },
  chat__input: {
    fontSize: 18, 
    border: 0,
    width: '100%',
    outline: 'none',
  },
}

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
      <List className="listScroll" style={styles.chat__list}>
        <ListItem>
          <input style={styles.chat__input} 
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
        : <h4 style={{ textAlign: 'center', padding: 10 }}>У тебя пока нет чатов</h4>}
      </List> 
    );
  }
}