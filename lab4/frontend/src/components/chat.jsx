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


const styles = {
  chat__card: {
    width: '100%',
    height: '100%',
  },
  chat__header: {
    backgroundColor: '#FCEAEA',
    flexDirection: "row-reverse",
    textAlign: 'right',
    padding: 10,
  },
  chat__backgroundColor: {
    backgroundColor: '#FCEAEA',
  },
  chat__avatar: {
    marginLeft: 25,
    width: 45,
    height: 45,
    color: 'black',
  },
  chat__input: {
    borderRadius: 10,
    padding: 7,
    fontSize: 14, 
    border: '1px solid #FCEAEA',
    width: '100%',
    outline: 'none',
  },
  chat__iconButton: {
    backgroundColor: '#EB5757', 
    color: 'white',
  },
  chat__content: {
    height: 500,
    overflow: 'auto',
  },
  chat__listItem_come: {
    justifyContent: 'flex-end',
  }, 
  chat__listItem_me: {
    flexDirection: 'column',
    alignItems: 'start',
  },
  chat__chip_me: {
    backgroundColor: '#FCEAEA',
  },
  chat__sendtime: {
    color: 'grey',
    fontSize: 14,
  },
  chat__user_link: {
    textDecoration: 'none',
    color: 'black',
  }
}

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
        <Card style={styles.chat__card}>
          <CardHeader
              avatar={this.props.avatar ? 
                <Link to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                  <Avatar style={styles.chat__avatar} src={"data:image/png;base64," + `${this.props.avatar}`} />
                </Link> : 
                <Link to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                <AccountCircleOutlinedIcon style={styles.chat__avatar} />
                </Link>}
              title={<Link style={styles.chat__user_link} to={(this.props.title == this.props.chatId) ? `/desk/${this.props.deskId}` : `/profile/${this.props.title}`}>
                      {this.props.title}
                    </Link>}
              style={styles.chat__header}
          />
          <CardContent style={styles.chat__content}  id="listScroll2">
            {this.props.getAllMessage ? 
              <List>
                {this.props.getAllMessage.map((data, index) => (
                  <ListItem key={index} style={(this.props.yourUsername == data.from_user) ? styles.chat__listItem_come : styles.chat__listItem_me}>
                    {(this.props.yourUsername == data.from_user || !data.from_user) ? null :
                      <React.Fragment>
                        <Link style={styles.chat__user_link} to={`/profile/${data.from_user}`} >
                          <h4 style={{ margin: 2, paddingLeft: 4 }}>{data.from_user}</h4>
                        </Link>
                      </React.Fragment>
                    }
                    <Chip label={data.message} style={(this.props.yourUsername == data.from_user) ? styles.chat__chip_me : null}/>
                  </ListItem>
                ))}
              </List> 
              : null}
          </CardContent>
          <CardActions style={styles.chat__backgroundColor}>
            <input style={styles.chat__input} 
                    placeholder="Напишите сообщение..." 
                    type="text"
                    value={this.props.input}
                    onChange={this.props.handleOnInputMessage}
                    onKeyDown={this.props.handleKeyDown}
            />
            <IconButton
                style={styles.chat__iconButton}
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