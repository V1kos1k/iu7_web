import { observable, action, computed } from 'mobx';

export default class DeskStore {
  constructor(api) {
    this.isLoading = false;
    this.api = api;

    return this;
  }

  @observable isLoading;

  @action
  image(deskId) {
    this.isLoading = true;
    return this.api.API.Desk.image(deskId)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(() => {
        this.isLoading = false;
      })
  }

  @action
  loadDeskInfo(deskId) {
    this.isLoading = true;
    return this.api.API.Desk.loadDeskInfo(deskId)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(() => {
        this.isLoading = false; 
      })
  }

  @action
  loadDeskMembers(deskId) {
    this.isLoading = true;
    return this.api.API.Desk.loadDeskMembers(deskId)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
      })) .finally(action(() => {
        this.isLoading = false;
      }));
  }

  @action
  joinTheBoard(deskId) {
    this.isLoading = true;
    return this.api.API.Desk.joinTheBoard(deskId)
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
  outOfTheBoard(deskId, username) {
    this.isLoading = true;
    return this.api.API.Desk.outOfTheBoard(deskId, username)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }))
  }

  @action
  acceptUser(deskId, username) {
    this.isLoading = true;
    return this.api.API.Desk.acceptUser(deskId, username)
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
  declineUser(deskId, username) {
    this.isLoading = true;
    return this.api.API.Desk.declineUser(deskId, username)
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
  searchDesk(gender, age, city, tags) {
    this.isLoading = true;
    return this.api.API.Desk.searchDesk(gender, age, city, tags)
      .then(action(res => {
        this.isLoading = false;
        return res;
      })) .catch(action(err => {
        this.isLoading = false;
        throw err;
      })) .finally(action(() => {
        this.isLoading = false;
      }))
  }

  @action createDesk(image, deskLabel, isPrivate, gender, age, 
    city, genre, game, maxPeople) {
      this.isLoading = true;
      return this.api.API.Desk.createDesk(image, deskLabel, isPrivate, 
          gender, age, city, genre, game, maxPeople)
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