import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import SendIcon from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';

import { useRouteMatch, Link, useLocation } from "react-router-dom";
import { observable, computed } from 'mobx';
import { inject, observer } from 'mobx-react';

import './Chat.css';


@inject('socketStore')
@observer
export default class Chat extends Component {
  constructor(props) {
    super(props);
  }

  @observable input = '';

  componentDidUpdate() {
    var elem = document.getElementById('listScroll2');
    elem.scrollTop = elem.scrollHeight;
  }

  render() {
    
    return(
      <React.Fragment>
        <Card className="chat__card">
          <CardHeader
              avatar={this.props.avatar ? 
                <Link to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                  <Avatar className="chat__avatar" src={"data:image/png;base64," + `${this.props.avatar}`} />
                </Link> : 
                <Link to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                <AccountCircleOutlinedIcon className="chat__avatar" />
                </Link>}
              title={<Link className="chat__user-link" to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                      {this.props.title}
                    </Link>}
              className="chat__header"
          />
          <CardContent className="chat__content"  id="listScroll2">
            {this.props.getAllMessage ? 
              <List>
                {this.props.getAllMessage.map((data, index) => (
                  <ListItem key={index} className={(this.props.yourUsername == data.from_user) ? "chat__list-item-come" : "chat__list-item-me"}>
                    {(this.props.yourUsername == data.from_user || !data.from_user) ? null :
                      <React.Fragment>
                        <Link className="chat__user-link" to={`/profile/${data.from_user}`} >
                          <h4 className="chat__user-text">{data.from_user}</h4>
                        </Link>
                      </React.Fragment>
                    }
                    <Chip label={data.message} className={(this.props.yourUsername == data.from_user) ? "chat__chip-me" : null}/>
                  </ListItem>
                ))}
              </List> 
              : null}
          </CardContent>
          <CardActions className="chat__background-color">
            <input className="chat__input" 
                    placeholder="Напишите сообщение..." 
                    type="text"
                    value={this.props.input}
                    onChange={this.props.handleOnInputMessage}
                    onKeyDown={this.props.handleKeyDown}
            />
            <IconButton
                className="chat__icon-button"
                size="medium"
                onClick={this.props.handleOnClickSendMessage}
            >
              <SendIcon />
            </IconButton>
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}