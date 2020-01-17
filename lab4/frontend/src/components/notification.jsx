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

const styles = {
    notifications__card: {
        width: 500,
        backgroundColor: "#FCEAEA",
        overflow: 'auto',
        maxHeight: 300,
    },
    profile__avatar: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    deskprofile__link: {
        textDecoration: 'none',
        color: 'black',
    }
};

@inject('notificationStore')
@observer
export default class Notification extends Component {
    @observable disableControls = false;

    constructor(props) {
        super(props);
        this.disableControls = this.props.data.disableControls || false;
    }

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
                <Link to={`/profile/${user.username}`} style={styles.deskprofile__link}>
                    {user.avatar.data ?  <Avatar style={styles.profile__avatar} src={"data:image/png;base64," + `${user.avatar.data}`} /> : <AccountCircleOutlinedIcon style={styles.profile__avatar}/>}
                </Link>
                <Link to = {`/desk/${desk_id}`} style={styles.deskprofile__link}>
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
