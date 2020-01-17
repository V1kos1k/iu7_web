import { observable, action, computed } from 'mobx';

class User {
  @observable isAvatarLoading = false;
  @observable avatar = null;


  constructor(username, api) {
    this.username = username;
    this.api = api;
    this.loadAvatar()
  }

  @computed
  get isAvatarLoaded() {
    return this.avatar !== null;
  }

  @action
  loadAvatar() {
    if(this.avatar === null) {
      this.isAvatarLoading = true;
      return this.api.API.User.avatar(this.username)
          .then(action(res => {
            this.avatar = res;
            this.isAvatarLoading = false;
          })).catch(action(err => {
            this.isAvatarLoading = false;
            throw err;
          })).finally(action(() => {
            this.isAvatarLoading = false;
          }))
    } else {
      return new Promise(resolve => resolve(this.avatar));
    }
  }

}

export default class UserStore {
  @observable isLoading;

  otherUsers = {};

  getUser(username) {
    if(this.otherUsers[username] === undefined){
      this.otherUsers[username] = new User(username, this.api)
    }
    return this.otherUsers[username];
  }

  constructor(api) {
    this.isLoading = false;
    this.api = api;

    return this;
  }

  @computed
  get username() {
    return this.api.API.User.username;
  }

  @action
  avatar(username) {
    this.isLoading = true;
    return this.api.API.User.avatar(username)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(() => {
        this.isLoading = false;
      });
  }

  @action loadInfo(username) {
    this.isLoading = true;
    return this.api.API.User.loadInfo(username)
      .then(action((res) => {
        this.isLoading = false;
        return res;
      })) .catch(action((err) => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }


  @action saveSettings(file, firstname, lastname, date,
    gender, city, aboutMe, genre, game) {
      this.isLoading = true;
      if (genre) {
        genre = genre.toString().split(',').map(data => {
          return (
            data.trim()
          );
        });
      } else {
        genre = [];
      } if (game) {
        game = game.toString().split(',').map(data => {
          return (
            data.trim()
          );
        });
      } else {
        game = [];
      }
      return this.api.API.User.saveSettings(file, firstname, lastname, date,
                                  gender, city, aboutMe, genre,
                                  game)
        .then(action((res) => {
          this.isLoading = false;
          return res;
        })) .catch(action((err) => {
          this.isLoading = false;
          throw err;
        })) .finally(action(() => {
          this.isLoading = false;
        }));
  }

  @action loadAllDeskInfo(username) {
    this.isLoading = true;
    return this.api.API.User.loadAllDeskInfo(username)
      .then(action((res) => {
        this.isLoading = false;
        return res;
      })) .catch(action((err) => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action loadCreatedDeskInfo(username) {
    this.isLoading = true;
    return this.api.API.User.loadCreatedDeskInfo(username)
      .then(action((res) => {
        this.isLoading = false;
        return res;
      })) .catch(action((err) => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }
}
