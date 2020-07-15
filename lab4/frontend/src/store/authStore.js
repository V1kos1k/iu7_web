import { observable, action, computed } from 'mobx';

export default class AuthStore {
  constructor(api) {
    this.isLoading = false;
    this.isLogin = false;
    this.api = api;

    return this;
  }

  @observable isLoading;
  @observable isLogin;

  @action login(username, password) {
    this.isLoading = true;
    return this.api.API.Auth.login(username, password)
      .then(action((res) => {
        this.isLoading = false;
        this.isLogin = true;
        return res;
      })) .catch(action((err) => {
        this.isLoading = false;
        this.isLogin = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action registration(username, email, password, date, gender) {
    this.isLoading = true;
    return this.api.API.Auth.reggister(username, email, password, date, gender)
    .then(action((res) => {
      this.isLoading = false;
      this.isLogin = true;
      return res;
    })) .catch(action((err) => {
      this.isLoading = false;
      this.isLogin = false;
      throw err;
    })) .finally(action(() => {
      this.isLoading = false;
    }));
  }

  @action refreshToken() {
    this.isLoading = true;
    return this.api.API.Auth.refreshToken()
    .then(action((res) => {
      this.isLoading = false;
      this.isLogin = true;
      return res;
    })) .catch(action((err) => {
      this.isLoading = false;
      this.isLogin = false;
      throw err;
    })) .finally(action(() => {
      this.isLoading = false;
    }));
  }

  @computed 
  get username() {
    return this.api.API.Auth.username;
  }

  @action exit() {
    this.api.API.Auth.clear();
  }
}