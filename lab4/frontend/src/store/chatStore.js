import { observable, action, computed, reaction } from 'mobx';

export default class ChatStore {
  constructor(api, socketStore, userStore) {
    this.isLoading = false;
    this.api = api;

    this.socketStore = socketStore;
    this.userStore = userStore;

    reaction(() => this.socketStore.userChats, () => this.userChats());

    return this;
  }

  @observable isLoading;
  @observable chats = [];

  @computed
  get username() {
    return this.api.API.Chat.username;
  }

  @action
  userChats() {
    let newUserChats = this.socketStore.userChats.map(data => {
      return {
        user: this.userStore.getUser(data.username),
        chat_id: data.chat_id,
      }
    });
    newUserChats.forEach((n) => this.chats.push(n));
    return this.chats;
  }

  @action 
  getChatId(username) {
    this.isLoading = true;
    return this.api.API.Chat.getChatId(username)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
      throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action
  getChatUsers(chatId) {
    this.isLoading = true;
    return this.api.API.Chat.getChatUsers(chatId)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }

}