import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '../Button/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

import './ProfileInfo.css';

import { useRouteMatch, Link } from "react-router-dom";

export default function ProfileInfo(props) {
  let { url } = useRouteMatch();
  const username = url.split('/')[2];
  let button;

  if (props.isUsername) {
    button = <Box p={2} className ="profile-info__box">
                <Link to={`/profile/${username}/settings`}>
                  {/* <Fab style={{ backgroundColor: '#EB5757', color: 'white'}} aria-label="edit"> */}
                  <Button modifiers="profile-info__button-edit">
                    <EditIcon />
                  </Button>
                  {/* </Fab> */}
                </Link>
              </Box>;
  } else {
    button = <Box p={2} className ="profile-info__box">
              <Link to={`/chats/${props.chatId}`} className = "profile-info__link">
                <Button modifiers="profile-info__button-write">
                  <MessageOutlinedIcon />&nbsp;Написать
                </Button>
              </Link>
            </Box>;
  }

  return (
    <Card className="profile-info__card">
      <CardContent>
        <Box display="flex"
            alignItems='flex-start'
            justifyContent="space-between"
        >
          <Box p={2}>
            {props.avatar ? <Avatar className="profile-info__avatar" src={"data:image/png;base64," + `${props.avatar}`} /> : <AccountCircleOutlinedIcon className="profile-info__avatar"/>}
            <Typography component="div">
              <Box fontSize='h5.fontSize' m={1} textAlign="center">
                {props.firstname}
              </Box>
              <Box fontSize='h5.fontSize' textAlign="center">
                {props.lastname}
              </Box>
            </Typography>
          </Box>  
          <Box flexGrow={2}>
            <Typography component="div">
              <Box fontSize={18} m={1}>
                {props.username}
              </Box>
              <Box fontSize={18} m={1}>
                Пол:  {props.gender ? '♀' : '♂'}
              </Box>
              <Box fontSize={18} m={1}>
                Город: {props.city}
              </Box>
              <Box fontSize={18} m={1}>
                Дата рождения: {props.date}
              </Box>
              <Box fontSize={18} m={1}>
                Любимые жанры: {props.genre}
              </Box>
              <Box fontSize={18} m={1}>
                Любимые игры: {props.game}
              </Box>
            </Typography>
          </Box>
          {button}
        </Box>
      </CardContent>
    </Card>
  );
}