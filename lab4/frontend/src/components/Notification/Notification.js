import React, {Component} from "react";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ListItemText from "@material-ui/core/ListItemText";
import {IconButton} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import './Notification.css';

@inject('notificationStore')
@observer
export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.disableControls = this.props.data.disableControls || false;
    }

    @observable disableControls = false;

    @action
    handleOnAccept(e) {
        this.disableControls = true;
        this.props.data.disableControls = true;
        this.props.notificationStore.acceptUserNotification(this.props.data);
    }

    @action
    handleOnDecline(e) {
        this.disableControls = true;
        this.props.data.disableControls = true;
        this.props.notificationStore.declineUserNotification(this.props.data);
    }

    render() {
        let { user, desk_id, deskTitle } = this.props.data;
        return (
            <React.Fragment>
                <Link to={`/profile/${user.username}`} className="notification__link">
                    {user.avatar.data ?  <Avatar className="notification__profile-avatar" src={"data:image/png;base64," + `${user.avatar.data}`} /> : <AccountCircleOutlinedIcon  className="notification__profile-avatar"/>}
                </Link>
                <Link className="notification__link" to = {`/desk/${desk_id}`} >
                    <ListItemText primary={`${user.username} хочет присоединиться к доске "${deskTitle}"`} />
                </Link>
                <IconButton color="secondary"
                            disabled = {this.disableControls}
                            onClick={(e) => this.handleOnAccept(e)}>
                    <CheckCircleIcon />
                </IconButton>
                <IconButton color="inherit"
                            disabled = {this.disableControls}
                            onClick={(e) => this.handleOnDecline(e)}>
                    <CancelIcon />
                </IconButton>
            </React.Fragment>
        )
    }
}
