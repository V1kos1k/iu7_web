import BaseApi from './baseApi';

export default class DeskApi extends BaseApi {
  constructor(axios) {
    super(axios);

  }

  async image(deskId) {
    let res = await this.axios.get(`api/desks/${deskId}/image`);
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

  async loadDeskInfo(deskId) {
    let res = await this.axios.get(`api/desks/${deskId}`);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      throw 'not found';
    }
  }

  async loadDeskMembers(deskId) {
    let res = await this.axios.get(`api/desks/${deskId}/members`);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      throw 'not found';
    }
  }

  async joinTheBoard(deskId) {
    let res = await this.axios.post(`api/desks/${deskId}/members`);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      if (res.response.status === 404) {
        throw 'not found';
      } else if (res.response.status === 406) {
        if (res.response.data.error === -1) {
          throw 'К сожалению, мест не осталось(';
        } else if(res.response.data.error === -2) {
          throw 'К сожалению, ты не подходишь по указанным критериям (возраст/пол).';
        } else if (res.response.data.error == 'Not Acceptable') {
          throw 'Ты уже подал заявку на вступление, жди ответа)';
        } 
      }
    }
  }

  async outOfTheBoard(deskId, username) {
    let res = await this.axios.delete(`api/desks/${deskId}/members`, {username: username});
    if (res.status === 200) {
      return true;
    } else {
      throw res;
    }
  }


  async acceptUser(deskId, username) {
    let res = await this.axios.put(`api/desks/${deskId}/members/accept`, {username: username});
    if (res.status === 200) {
      return true;
    } else if (res.response.status === 406){
      throw 'Доска заполнена';
    } else {
      throw res;
    }
  }

  async declineUser(deskId, username) {
    let res = await this.axios.put(`api/desks/${deskId}/members/decline`, {username: username});
    if (res.status === 200) {
      return true;
    } else if (res.response.status === 404){
      throw res;
    } else {
      throw res;
    }
  }

  async searchDesk(gender, age, city, tags) {
    {gender ? null : gender = ''}
    {age ? null : age = ''}
    {city ? null : city = ''}
    {tags ? null : tags = ''}
    let res = await this.axios.get(`api/desks?gender=${gender}&age=${age}&city=${city}&tags=${tags}`);
    if (res.status === 200 && res.data) {
      return res.data;
    } else {
      if (res.response.status == 404) {
        throw 'not found';
      } 
    }
  }

  async createDesk(image, deskLabel, isPrivate, gender, age, 
                    city, genre, game, maxPeople) {
    let res = await this.axios.post('/api/desks',
      {
        maxPeople: Number(maxPeople),
        title: deskLabel,
        isPrivate: Boolean(Number(isPrivate)),
        gender: Number(gender),
        ages: age,
        city: city,
        genres: genre,
        games: game
      });
      if (res.status === 201 && res.data){
        if (image) {
          const formData = new FormData();
          formData.append('file', image);
          let resPhoto = await this.axios.put(`api/desks/${res.data.desk_id}/image`,
            formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }
        return res.data.desk_id;
      } 
  }
}

