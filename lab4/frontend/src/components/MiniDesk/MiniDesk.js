import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Content from '../../components/Content/Content';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ChipsArray from '../Chips/Chips';

import './MiniDesk.css';

export default function MiniDesk(props) {
  const tags = [];
  tags.push(...props.genre);
  tags.push(...props.game);
  return(
  <Card className="minidesk__card">
    <CardHeader
      avatar=
      {props.image ? <Avatar className="minidesk__image" src={"data:image/png;base64," + `${props.image}`} /> : <img className="minidesk__image" src={require('../../../static/img/missile.png')} />}
      title= {<h2>{props.deskLabel}</h2>}
      action = {props.isPrivate ? <LockIcon /> : <LockOpenIcon />}
      className = "minidesk-header__content"
    />
    <CardContent className = "minidesk__content">
      <div>Игроков: {props.players} </div>
      <div>Свободных мест: {props.empty}</div>
      <div>Возраст: {props.age[0]} - {props.age[1]}</div>
      <ChipsArray tags={ tags }/>
    </CardContent>
  </ Card>
  )
}