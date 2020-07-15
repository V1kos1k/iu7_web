import React, {Component} from 'react';
import Popper from '@material-ui/core/Popper';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import { CardContent } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {inject, observer} from "mobx-react";
import Notification from '../Notification/Notification';
import './NotificationList.css';

@inject('notificationStore')
@observer
export default class NotificationList extends Component{

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
            <Card className="notification-list__card">
              {this.props.notificationStore.activeNotificationCount > 0
              ? <List>
                  {this.renderNotifications()}
                </List>
              : <CardContent>
                  <div className="notification-list__text">Новых уведомлений пока нет.</div>
                </CardContent>
              }
            </Card>
          </Box>
        </Popper>
        );
    }
}
