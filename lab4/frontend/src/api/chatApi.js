import BaseApi from './baseApi';

export default class ChatApi extends BaseApi {
  constructor(axios) {
    super(axios);
  }

  async getChatId(username) {
    let res = await this.axios.post(`/api/users/${this.username}/chatwith?user=${username}`);

    if ((res.status === 200 || res.status === 201) && res.data) {
      return res.data.chat_id;
    } else {
      throw res;
    }
  }

  async getChatUsers(chatId) {
    let res = await this.axios.get(`/api/chats/${chatId}/users`);

    if (res.status === 200 && res.data) {
      return res.data;
    } else if (res.response.status === 404) {
      throw res;
    } else {
      throw res;
    }
  }

  async getUserChats(username) {
    let res = await this.axios.get(`/api/users/${username}/chats/`);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      throw res;
    }
  }

  get username(){
    return window.localStorage.getItem("username");
  }
}