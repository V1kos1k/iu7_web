import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import './ChatItem.css';

export default function ChatItem(props) {
  let { user, chat_id } = props.data;
  
  return(
    <Link className = "chat__link" to={`/chats/${chat_id}`}>
      <ListItem button className = {props.unread ? "chat__unreadMessage" : null}>
        <ListItemAvatar>
        {user.avatar ? 
          <Avatar className ="chat__userAvatar" src={"data:image/png;base64," + `${user.avatar.data}`} />
        : 
          <AccountCircleOutlinedIcon className ="chat__userAvatar" />
        }
        </ListItemAvatar>
        <h4 className = "chat__username">{user.username}</h4>
        <ListItemSecondaryAction>
          <p className="chat__unreadMessage_text">{props.unread ? props.unread : null}</p>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
}
