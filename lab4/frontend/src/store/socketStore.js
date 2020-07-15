import { observable, action, computed } from 'mobx';

export default class SocketStore {
  constructor(props) {
    this.ws = null;
    this.api = props;

    return this;
  }

  @observable allChatMessages = [];
  @observable unreadMessage = [];
  @observable userChats = [];
  @observable allNotifications = [];

  connect(username) {
    this.ws = new WebSocket(`ws://localhost:4444/api/users/${username}/chat`);
    this.ws.onopen = () => {
      console.log('connected');
    }

    this.ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message.type == 'gm') {
        this.allChatMessages = message.messageData;
      } else if (message.type == 'tm') {
        if (message.messageData[0] && message.messageData[0].chat_id == window.location.href.split('/')[4]) {
          message.messageData.map(data => {
            this.allChatMessages.push(data);
          })
        } else if (message.messageData[0]) {
          message.messageData.map(data => {
            this.unreadMessage.push(data);
          })
        }
      } else if (message.type == 'chats') {
        this.userChats = message.chats;
      } else if (message.type == 'tdm' && window.location.href.split('/')[4] == message.messageData[0].desk_id && window.location.href.split('/')[3] == 'desk') {
        message.messageData.map(data => {
          this.allChatMessages.push(data);
        })
      } else if (message.type == 'nu') {
        this.allNotifications = message.waiting;
      } 
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      this.ws = new WebSocket(`ws://localhost:4444/api/users/${props}/chat`);
    }
  }

  addMessage = (message) => {
    this.allChatMessages.push(message);
  }

  sendMessage = (message, chatId, username) => {
    const sendMessage = {
      type: 'sm',
      chat_id: chatId,
      message: message,
      from_user: username,
      sendTime: new Date().toJSON()
    };


    this.ws.send(JSON.stringify(sendMessage));
    this.addMessage(sendMessage);
  }

  sendMessageDesk = (message, chatId, username) => {
    const sendMessage = { 
      type: 'sdm',
      chat_id: chatId,
      message: message,
      from_user: username,
      sendTime: new Date().toJSON()
    };

    this.ws.send(JSON.stringify(sendMessage));
    this.addMessage(sendMessage);
  }

  getAllMessage = (chatId) => {
    const sendMessage = {
      type: 'gm',
      chat_id: chatId,
    };
    this.unreadMessage = this.unreadMessage.filter(data => data.chat_id != chatId);

    this.ws.send(JSON.stringify(sendMessage));
  }
}
