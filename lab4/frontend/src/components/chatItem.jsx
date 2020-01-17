import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

const styles = {
  chat__link: {
    textDecoration: 'none',
    color: 'black',
  },
  chat__userAvatar: {
    width: 45,
    height: 45,
  },
  chat__unreadMessage: {
    backgroundColor: 'rgba(235, 87, 87, 0.12)',
  }
}

export default function ChatItem(props) {
  let { user, chat_id } = props.data;
  let color = (props.unread ? styles.chat__unreadMessage : null);
  
  return(
    <Link style={styles.chat__link} to={`/chats/${chat_id}`}>
      <ListItem button style={color}>
        <ListItemAvatar>
        {user.avatar ? 
          <Avatar style={styles.chat__userAvatar} src={"data:image/png;base64," + `${user.avatar.data}`} />
        : 
          <AccountCircleOutlinedIcon style={styles.chat__userAvatar} />
        }
        </ListItemAvatar>
        <h4 style={{ margin: 2, paddingLeft: 4 }}>{user.username}</h4>
        <ListItemSecondaryAction>
          <p style={{color: 'grey'}}>{props.unread ? props.unread : null}</p>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
}