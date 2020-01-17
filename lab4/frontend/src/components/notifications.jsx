import React, {Component} from 'react';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import {inject, observer} from "mobx-react";
import Notification from "./notification.jsx";


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
export default class Notifications extends Component{

    constructor(props){
        super(props);
    }

    renderNotifications(){
        return this.props.notificationStore.notifications.map((data, index) => {return (
            <ListItem key={index}>
                <Notification data={data}/>
            </ListItem>
        )});
    }

    render() {
        return (
            <Popper open={Boolean(this.props.anchorEl)}
                    anchorEl={this.props.anchorEl}>
                <Box boxShadow={15} >
                    <Card style={styles.notifications__card}>
                        {this.props.notificationStore.activeNotificationCount > 0
                            ?   <List>
                                {this.renderNotifications()}
                            </List>
                            :   <CardContent>
                                <Typography
                                    color="textPrimary"
                                    align="center"
                                    style={{lineHeight: "20px", fontSize: "18px"}}>
                                    Новых уведомлений пока нет.
                                </Typography>
                            </CardContent>
                        }
                    </Card>
                </Box>
            </Popper>
        );
    }
}
