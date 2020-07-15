import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ChipInput from 'material-ui-chip-input';
import SearchIcon from '@material-ui/icons/Search';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from "react-router-dom";

import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

import Loader from '../../components/Loader/Loader';
import Navbar from '../../components/Navbar/Navbar';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import Filter from '../../components/Filter/Filter';
import MiniDesk from '../../components/MiniDesk/MiniDesk';
import ErrorWindow from '../../components/ErrorWindow/ErrorWindow';

import './MainScreen.css';

@inject("deskStore", "authStore")

@observer
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.age = [0, 100];
  }

  tags;
  ntags = null;
  open = false;
  @observable anchorEl = null;
  @observable gender;
  age;
  @observable city = '';
  @observable error = false;

  @observable alldesk = [];

  @action
  handleTagChange = (e) => {
    this.tags = e;
  }

  @action
  handleClickFilter = (e) => {
    this.anchorEl = this.anchorEl ? null : e.currentTarget;
  }

  @action
  handleOnGenderChange = (e) => {
    this.gender = e.target.value;
  }

  @action
  handleOnAgeChange = (e) => {
    this.age = e;
  }

  @action
  handleOnInputCity = (e) => {
    this.city = e.target.value;
  }

  @action
  handleClickSearch = (e) => {
    this.anchorEl = null;
    this.alldesk = [];
    this.ntags = this.tags;
    this.tags = null;
    this.props.deskStore.searchDesk(this.gender, this.age, this.city, this.ntags)
      .then(action(res => {
        let ind = 0;
        res.map(data => {
          this.props.deskStore.loadDeskImage(data.id)
            .then(action(res => {
                this.alldesk[ind++] = {
                  deskLabel: data.title,
                  isPrivate: data.is_private,
                  age: data.ages,
                  players: data.current_people,
                  genre: data.genres,
                  empty: data.max_people - data.current_people,
                  game: data.games,
                  deskId: data.id,
                  image: res.data
                } 
            })) .catch(action(err => {
              console.log(err);
            }))}) 
      })) .catch(action(err => {
      }))
  }

  @action
  initSearch() {
    this.alldesk = [];
    this.props.deskStore.searchDesk()
      .then(action(res => {
        let ind = 0;
        res.map(data => {
          this.props.deskStore.loadDeskImage(data.id)
            .then(action(res => {
              this.alldesk[ind++] = {
                deskLabel: data.title,
                isPrivate: data.is_private,
                age: data.ages,
                players: data.current_people,
                genre: data.genres,
                empty: data.max_people - data.current_people,
                game: data.games,
                deskId: data.id,
                image: res.data
              } 
            })) .catch(action(err => {
              console.log(err);
            }))
        })  
      })) .catch(action(err => {
        console.log(err);
      }))
  }

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }

  componentDidMount() {
    this.initSearch();
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.deskStore.isLoading}>
          <Container>
            {this.error ? <ErrorWindow message={this.error}
                                        type={this.type}
                                        changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
            <Navbar isLogin={this.props.authStore.isLogin}/>
            <Content modifiers="content_theme_main">
              <div className="main__flex">
                <Filter anchorEl={ this.anchorEl }
                        gender={ this.gender }
                        age={ this.age }
                        city={ this.city }
                        handleClickFilter={ (e) => this.handleClickFilter(e) }
                        handleOnGenderChange={ (e) => this.handleOnGenderChange(e) } 
                        handleOnAgeChange={ (e) => this.handleOnAgeChange(e) } 
                        handleOnInputCity={ (e) => this.handleOnInputCity(e) } />
                <IconButton  color="inherit"
                              onClick={this.handleClickFilter}>
                  <img className="main__filter-icon"
                        src="https://img.icons8.com/windows/96/000000/filled-filter.png" />
                </IconButton>
                <ChipInput className="main__chips-input"
                          value={this.tags}
                          onChange = { (chips) => this.handleTagChange(chips) }
                          fullWidth
                          label='Поиск по тегам' />
                <Link to={`/?gender=${this.gender ? this.gender : ''}&age=${this.age ? this.age : ''}&city=${this.city ? this.city : ''}`} >
                  <IconButton color="inherit"
                              onClick={this.handleClickSearch}>
                    <SearchIcon className="main__search-icon" />
                  </IconButton>
                </Link>
              </div>
              <div className = "main__search-tags">
                {this.ntags == null ? null : 
                 <p>Поиск был произведен по тегам: {this.ntags.join(', ')}</p>}
              </div>
              {this.alldesk.length == 0 
                ? <div className = "main__no-desks"> 
                    <p>Здесь будут найденные доски</p>
                    <p>Сейчас их не нашлось</p>
                    <p>Нам тоже грустно</p>
                    <img src={require('../../../static/img/sad.png')} className = "main__image"/>
                 </div>
                : 
                  <GridList cellHeight='auto' spacing={14} cols={4}>
                    {this.alldesk.map((tile,index) => (
                      <GridListTile key={index} cols={1}>
                        <Link to = {`/desk/${tile.deskId}`}
                              className="main__link">
                          <MiniDesk deskLabel={tile.deskLabel}
                                    isPrivate={tile.isPrivate}
                                    players={tile.players}
                                    empty={tile.empty}
                                    age={tile.age}
                                    genre={tile.genre}
                                    game={tile.game}
                                    image={tile.image}/>
                        </Link>
                      </GridListTile>
                    ))}
                  </GridList>
              } 
            </Content>
          </Container>
        </Loader> 
      </React.Fragment>
    );
  }
}
