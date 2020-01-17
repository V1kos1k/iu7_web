import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import NoMeetingRoomOutlinedIcon from '@material-ui/icons/NoMeetingRoomOutlined';
import Badge from '@material-ui/core/Badge';

import { Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Notifications from './notifications.jsx';

import ErrorWindow from './errorWindow.jsx';

import {inject, observer} from 'mobx-react';
import { action, observable, computed } from 'mobx';

const styles = {
  navbar: {
    boxShadow: 'none',
    backgroundColor:"#EB5757"
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  linkButton: {
    color: 'white',
  },
}

@inject("authStore", "userStore", "deskStore", "socketStore", "notificationStore")
@observer
export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  @observable anchorEl = null;
  @observable error = false;


  @action
  handleOnNotification = (e) => {
    this.anchorEl = this.anchorEl ? null : e.currentTarget;
  };


  handleOnExit = () => {
    this.props.authStore.exit();
    location.reload();
  };

  handleOnSignIn = () => {
    return(<Link to="/auth"></Link>);
  }

  @action
  changingTheErrorState = () => {
    this.error = !this.error;
  }


  render() {
    return (
      <React.Fragment>
        <div className="navbar">
          <AppBar  position="static" style={styles.navbar}>
            <Toolbar>
            {this.error ? <ErrorWindow message={this.error}
                                    type={this.type}
                                  changingTheErrorState={ (e) => this.changingTheErrorState(e)}/> : null}
            <Box display="flex"
                justifyContent="space-around"
                width="100%">
              <Link to="/" style={styles.linkButton}>
                <img src={require('../img/logo.svg')} alt={"logo"} style={{height:54, width:200}}/>
              </Link>
              <div>
                {this.props.isLogin ? (
                  <div>
                    <Link to={'/desk/new'} style={styles.linkButton}>
                      <IconButton
                          color="inherit">
                        <AddIcon />
                      </IconButton>
                    </Link>
                    <Notifications anchorEl={ this.anchorEl }
                          handleOnNotification={ (e) => this.handleOnNotification(e) }
                          />
                    <IconButton
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={this.handleOnNotification}>
                      <Badge
                          badgeContent={this.props.notificationStore.activeNotificationCount}
                          color="secondary"> {/* badgeContent должно подтягиваться количество уведомлений, пока что это будет 0 */}
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <Link to={`/chats`} style={styles.linkButton}>
                      <IconButton
                          aria-label="show 17 new notifications"
                          color="inherit"
                          onClick={this.handleOnMessage}>
                        <Badge
                            badgeContent={this.props.socketStore.unreadMessage.length}
                            color="secondary"> 
                          <MessageOutlinedIcon />
                        </Badge>
                      </IconButton>
                    </Link>
                    <Link to={`/profile/${this.props.authStore.username}`} style={styles.linkButton}>
                      <IconButton color="inherit">
                        <AccountCircleOutlinedIcon/>
                      </IconButton>
                    </Link>
                    <IconButton
                        color="inherit"
                        onClick={this.handleOnExit}>
                      <NoMeetingRoomOutlinedIcon />
                    </IconButton>
                  </div>
                ) : (<Link to="/auth" style={styles.linkButton}>
                  <IconButton color="inherit">
                    <MeetingRoomOutlinedIcon />
                  </IconButton>
                </Link>)}
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
    )
  }
}
