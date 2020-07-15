import React, { Component } from 'react';
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
import NotificationList from '../NotificationList/NotificationList';
import './Navbar.css';

import { Link } from "react-router-dom";

import { inject, observer } from 'mobx-react';
import { action, observable, computed } from 'mobx';
import logo from '../../../static/img/logo.jpg'; // with import


@inject("authStore", "socketStore", "notificationStore")
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
          <AppBar  position="static" className="navbar">
            <Toolbar className="navbar__toolbar">
              <Link to="/" className="link-button">
                <img src={logo} alt={"logo"} className="logo"/>
              </Link>
              <div>
                {this.props.isLogin ? (
                  <div>
                    <Link to={'/desk/new'} className="link-button">
                      <IconButton
                          color="inherit">
                        <AddIcon />
                      </IconButton>
                    </Link>
                    <NotificationList anchorEl={ this.anchorEl }
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
                    <Link to={`/chats`} className="link-button">
                      <IconButton
                          aria-label="show 17 new notifications"
                          color="inherit"
                          >
                        <Badge
                            badgeContent={this.props.socketStore.unreadMessage.length}
                            color="secondary">
                          <MessageOutlinedIcon />
                        </Badge>
                      </IconButton>
                    </Link>
                    <Link to={`/profile/${this.props.authStore.username}`} className="link-button">
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
                ) : (<Link to="/auth" className="link-button">
                  <IconButton color="inherit">
                    <MeetingRoomOutlinedIcon />
                  </IconButton>
                </Link>)}
              </div>
          </Toolbar>
        </AppBar>
    </React.Fragment>
    )
  }
}
