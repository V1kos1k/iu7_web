import React, { Component } from 'react';

import Box from '@material-ui/core/Box';
import ChipInput from 'material-ui-chip-input';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {Link} from "react-router-dom";

import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';

import Filter from './filter.jsx';
import MiniDesk from './minidesk.jsx';
import Loader from './loader.jsx';
import ErrorWindow from './errorWindow.jsx';


@inject("deskStore", "authStore")
@observer
export default class MainPage extends Component {
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
  @observable city;
  @observable alldesk = [];
  @observable error = false;


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
  changingTheErrorState = () => {
    this.error = !this.error;
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
          this.props.deskStore.image(data.id)
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
          this.props.deskStore.image(data.id)
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
        console.log(err);
    }))
  }

  componentDidMount() {
    this.initSearch();
  }

  render() {
    return(
      <React.Fragment>
        <Loader isLoading={this.props.deskStore.isLoading}>
        {this.error ? <ErrorWindow message={this.error}
                                  type={this.type}
                                  changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
        <Box display="flex"
              justifyContent="center"
              alignItems="flexStart">
          <Box style={{ paddingTop: '14px' }}>
            <Filter anchorEl={ this.anchorEl }
                          gender={ this.gender }
                          age={ this.age }
                          city={ this.city }
                          handleClickFilter={ (e) => this.handleClickFilter(e) }
                          handleOnGenderChange={ (e) => this.handleOnGenderChange(e) } 
                          handleOnAgeChange={ (e) => this.handleOnAgeChange(e) } 
                          handleOnInputCity={ (e) => this.handleOnInputCity(e) }
                          />
            <IconButton 
                        color="inherit"
                        onClick={this.handleClickFilter}>
              <img style={{ width: '32px', height: '32px' }}
                  src="https://img.icons8.com/windows/96/000000/filled-filter.png" />
            </IconButton>
          </Box>
          <Box width="50%">
            <ChipInput
                        value={this.tags}
                        onChange = { (chips) => this.handleTagChange(chips) }
                        fullWidth
                        label='Поиск по тегам'
            />
          </Box>
          <Box style={{ paddingTop: '14px' }}>
          <Link to={`/?gender=${this.gender ? this.gender : ''}&age=${this.age ? this.age : ''}&city=${this.city ? this.city : ''}`} >
            <IconButton 
                        color="inherit"
                        onClick={this.handleClickSearch}>
              <SearchIcon style={{ width: '32px', height: '32px', color: 'black'}} />
            </IconButton>
            </Link>
          </Box>
        </Box>
        {this.ntags == null ? null : 
        <Typography color="textPrimary" 
                    align="center"
                    style={{lineHeight: "25px", fontSize: "18px"}}>
                Поиск был произведен по тегам: {this.ntags.join(', ')}
        </Typography>}
        {this.alldesk.length == 0 
          ? <Typography 
                    color="textPrimary" 
                    align="center"
                    style={{lineHeight: "50px", fontSize: "26px"}}>
                Здесь будут найденные доски.<br />
                Сейчас их не нашлось<br />
                Нам тоже грустно <br />
                <img src={require('../img/sad.png')} style = {{height: '100%', width:420}}/>
            </Typography>
          : <Box marginTop={'3%'}>
            <GridList cellHeight='auto' spacing={14} cols={4}>
              {this.alldesk.map((tile,index) => (
                <GridListTile key={index} cols={1}>
                  <Link to = {`/desk/${tile.deskId}`}
                        style={{ textDecoration: 'none' }}>
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
            </Box>
        } 
        </Loader> 
      </React.Fragment>
    );
  }
}