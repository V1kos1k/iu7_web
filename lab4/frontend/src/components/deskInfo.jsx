import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import ChipsArray from './Chips.jsx';

const styles = {
  desk__card: {
    width: '100%',
    marginTop: '1%',
    height: 660,
  },
  desk__card_header: {
    backgroundColor: "#FCEAEA",
    width: '100%',
    heigth: 152,
  },
  desk__card_content: {
    backgroundColor: "#ffffff",
    width: '100%',
    margin: '3%',
  },
  desk__image: {
    width: 130,
    height: 130,
  },
  desk__buttonWrite: {
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
  },
  desk__profileLink: {
    textDecoration: 'none',
    color: 'black',
  },
  desk__info: {
    margin:5,
  },
  desk__membersAvatar: {
    width: 50, 
    height: 50,
  }
}

export default function DeskInfo(props) {
  let button;
  let date;
  if (props.isMember) {
    button = <Box p={2} style={{ height: '100%' , }}>
                  <Button variant="contained" style={styles.desk__buttonWrite} onClick={props.handleOnClickDelete}>
                    Выйти
                  </Button>
              </Box>;
  } else {
    button = <Box alignSelf="flex-end" p={2} style={{ height: '100%'}}>
                <Button variant="contained" style={styles.desk__buttonWrite} onClick={props.handleOnClickJoin}>
                  Вступить
                </Button>
            </Box>;
  }

  return(
    <Card style={styles.desk__card}>
        <Box display="flex"
              alignItems="flex-start"
              flexDirection="column"
              justifyContent="space-between">
          <Box display="flex"
                flexDirection="row"
                style={styles.desk__card_header}
                justifyContent="center"
                >
            <Box p={2}>
              {props.image ? <img style={styles.desk__image} src={"data:image/png;base64," + `${props.image}`} /> : <img style={styles.desk__image} src={require('../img/missile.png')} />}
            </Box>
            <Box p={2} flexGrow={2}>
              <p style={{ fontSize: 30, margin:5 }}>
                {props.isPrivate ? <LockIcon /> : <LockOpenIcon />}
                {props.title}
              </p>
              <p style={{ color: 'rgba(0, 0, 0, 0.64)' }}>{props.city}</p>
            </Box>
            <Box>
              {button}
            </Box>
          </Box>
          <Box style={styles.desk__card_content}>
            <div style={{ marginBottom: 25 }}>
              <h3 style={styles.desk__info}>Ты нам подходишь, если:</h3>
              <p style={styles.desk__info}>твой возраст: {props.ages ? props.ages[0] : null} - {props.ages ? props.ages[1] : null}</p>
              <p style={styles.desk__info}>твой пол: {props.gender}</p>
            </div>
            <div style={{ marginBottom: 25 }}>
              <h3 style={styles.desk__info}>Участники ({props.currentPeople}/{props.maxPeople}):</h3>
              {props.members ? props.members.map((data, index) => {
                return(
                  <Link to={`/profile/${data.login}`} style={ styles.desk__profileLink } key={index}>
                    <p style={styles.desk__info}>{data.login}, {((new Date().getTime() - new Date(data.date_birth)) / (24 * 3600 * 365.25 * 1000)) | 0}</p>
                  </Link>
                )
              }) : null}
            </div>
            <div style={{ marginBottom: 25 }}>
              <h3 style={styles.desk__info}>Жанры:</h3>
              {props.genre ? <ChipsArray tags={props.genre} /> : null}
            </div>
            <div >
              <h3 style={styles.desk__info}>Игры:</h3>
              {props.game ? <ChipsArray tags={props.game} /> : null}
            </div>
          </Box>
        </Box>
    </Card>
  );
}