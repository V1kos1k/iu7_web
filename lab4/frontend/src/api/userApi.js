import BaseApi from './baseApi';
import UserStore from '../store/userStore';

export default class UserApi extends BaseApi {
  constructor(axios) {
    super(axios);
  }

  set username(username){
    if(username)
        window.localStorage.setItem("username",username);
  }

  get username(){
    return window.localStorage.getItem("username");
  }

  async avatar(username) {
    let res = await this.axios.get(`api/users/${username}/profile/image`);
    if (res.status === 200 && res.data) {
      return res;
    } else {
      if (res.response.status === 404) {
        return false;
      } else {
        console.log('не авторизован');
      }
    }
  }

  async loadInfo(username) {
    let res = await this.axios.get(`api/users/${username}/profile`);
    if (res.status === 200) {
      return res.data;
    } else {
      throw 'not found';
    }
  }

  async saveSettings(file, firstname, lastname, date, gender, 
                      city, aboutMe, genre, game) {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      let resPhoto = await this.axios.put(`api/users/${this.username}/profile/image`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    }

    let res = await this.axios.put(`/api/users/${this.username}/profile`,
      {
        newName: firstname, newSurname: lastname, newBirthDate: date, 
        newGender: Number(gender), newCity: city, newAboutMe: aboutMe, 
        newFavoriteGenres: genre, newFavoriteGames: game
      });
      if (res.status === 200) {
        return true;
      } else {
        if (res.response.status === 404) {
          alert(404);
          throw 'not found'
        } else {
          throw 'bad request'
        }
      }
  }

  async loadAllDeskInfo(username) {
    let res = await this.axios.get(`api/users/${username}/desks?isOwner=false`);
    if (res.status === 200) {
      return res.data;
    } else {
      throw 'not found';
    }
  }

  async loadCreatedDeskInfo(username) {
    let res = await this.axios.get(`api/users/${username}/desks?isOwner=true`);
    if (res.status === 200) {
      return res.data;
    } else {
      throw 'not found';
    }
  }

}