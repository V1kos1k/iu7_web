import BaseApi from './baseApi'
import AuthStore from '../store/authStore'
import jwtDecode from "jwt-decode"

export default class AuthApi extends BaseApi {
  constructor(axios) {
    super(axios);
    this.username = this.username;
    this.tokenUpdater = undefined;
    this.token = this.token;

    this.axios.interceptors.response.use(res => res, error => {
      if (error.response.status === 401) {
        let authStore = new AuthStore();
        authStore.isLogin = false;
      }
      return error;
    })
  }

  async login(username, password) {
    let res = await this.axios.post("/api/signin", 
        {username: username || this.username, 
          password: password || this.password});
    if (res.status === 200 && res.data) {
      this.username = username;
      this.token = res.data.token;
      this.settokenUpdater(this.refreshToken);

      return true;
    } else {
      if (res.response.status === 404) {
        throw 'incorrect data';
      } else {
        throw 'connection error';
      }
    }
  }

  async reggister(username, email, password, date, gender) {
    let res = await this.axios.post("/api/signup", 
        {username: username, email: email, password: password, birthDate: date, gender: Number(gender)});
    if (res.status === 201 && res.data) {
      this.username = username;
      this.token = res.data.token;
      this.settokenUpdater(this.refreshToken);
    } else {
      if (res.response.status === 409) {
        throw 'incorrect data';
      }
    }
  }

  set username(username){
    if(username)
        window.localStorage.setItem("username",username);
  }

  get username(){
    return window.localStorage.getItem("username");
  }

  set token(token) {
    window.localStorage.setItem("token", token);
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
  }

  get token() {
    return window.localStorage.getItem("token");
  }

  async refreshToken() {
    let res = await this.axios.put("/api/refreshToken");
    if (res.status === 201 && res.data) {
      this.token = res.data.token;
      return true;
    } else {
      throw 'life time token has expired';
    }
  }

  settokenUpdater(updater){
    clearInterval(this.tokenUpdater);
    let tokenData = jwtDecode(this.token);
    let interval = (tokenData.exp  - (Date.now().valueOf() / 1000))-10;
    this.tokenUpdater = setInterval(updater.bind(this), interval*1000);
  }

  clear() {
    this.username = undefined;
    this.token = undefined;
    clearInterval(this.tokenUpdater);
  }
}