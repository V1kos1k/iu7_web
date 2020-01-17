import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Typography from '@material-ui/core/Typography';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

import { useRouteMatch, Link } from "react-router-dom";

const styles = {
  profile__card: {
    width: '92%',
    backgroundColor: "#FCEAEA",
    marginTop: '1%',
  },
  profile__avatar: {
    width: 200,
    height: 200,
  },
  profile__buttonWrite: {
    minWidth: 125,
    align: "center",
    marginTop: 15,
    backgroundColor: "#EB5757",
    borderRadius: 10,
    color: "white",
    '&:hover': {
      backgroundColor: "#EB7D7D",
      color: '#FFF',
    },
    fontStyle: "normal",
    fontWeight: "bold",  
    textTransform: 'capitalize',
    fontSize: 16,
  }
}

export default function ProfileInfo(props) {
  let { url } = useRouteMatch();
  const username = url.split('/')[2];
  let button;

  if (props.isUsername) {
    button = <Box p={2} style={{ height: '100%' }}>
                <Link to={`/profile/${username}/settings`}>
                  <Fab style={{ backgroundColor: '#EB5757', color: 'white'}} aria-label="edit">
                    <EditIcon />
                  </Fab>
                </Link>
              </Box>;
  } else {
    // нуно будет запрашивать с бэка chat_id передается
    // если переписка с пользователем уже есть, то вернется существующий id
    // если ее еще нет, то создастся новый чат и вернется его id
    // при нажатии на кнопку будет бызываться обработчик, который будет производить запрос и переходить по ссылке на чат
    button = <Box alignSelf="flex-end" p={2} style={{ height: '100%'}}>
              <Link to={`/chats/${props.chatId}`} style={{ textDecoration: 'none' }}>
                <Button variant="contained" style={styles.profile__buttonWrite}>
                  <MessageOutlinedIcon />&nbsp;Написать
                </Button>
              </Link>
            </Box>;
  }

  return (
    <Card style={styles.profile__card}>
      <CardContent>
        <Box display="flex"
            alignItems='flex-start'
            justifyContent="space-between"
        >
          <Box p={2}>
            {props.avatar ? <Avatar style={styles.profile__avatar} src={"data:image/png;base64," + `${props.avatar}`} /> : <AccountCircleOutlinedIcon style={styles.profile__avatar}/>}
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