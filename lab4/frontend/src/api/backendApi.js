import axios from "axios";
import AuthApi from './authApi';
import UserApi from './userApi';
import DeskApi from './deskApi';
import ChatApi from './chatApi';

export default class BackendApi {
  api;
  axios;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:4444"
    });
    this.api = {
      Auth: new AuthApi(this.axios),
      User: new UserApi(this.axios),
      Desk: new DeskApi(this.axios),
      Chat: new ChatApi(this.axios),
    }
  }

  get API() {
    return this.api;
  }
}