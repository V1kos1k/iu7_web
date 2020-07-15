import React from 'react';
import classnames from 'classnames';
import './DeskInfo.css';

import Card from '@material-ui/core/Card';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '../Button/Button';
import ChipsArray from '../Chips/Chips';

import { Link } from "react-router-dom";

export default function DeskInfo(props) {
  let button;

  if (props.isMember) {
    button = <Button modifiers="desk-info__button" 
            buttonText="Выйти"
            onClick={props.handleOnClickDelete} />
  } else {
    button = <Button modifiers="desk-info__button" 
            buttonText="Вступить"
            onClick={props.handleOnClickJoin} />
  }
  return(
    <Card className={classnames("desk-info", props.modifiers)}>
      <div className="desk-info__upper-block">
        {props.image ? <img className="desk-info__image" src={"data:image/png;base64," + `${props.image}`} /> : <img className="desk-info__image" src={require('../../../static/img/missile.png')} />}
        <div className="desk-info__basic-info">
          <p className="desk-info__title">
            {props.isPrivate ? <LockIcon /> : <LockOpenIcon />}
            {props.title}
          </p>
          <p className="desk-info__city">{props.city}</p>
        </div>
        {button}
      </div>
      <div className="desk-info__lower-block">
        <div>
          <h3>Ты нам подходишь, если:</h3>
          <p>твой возраст: {props.ages ? props.ages[0] : null} - {props.ages ? props.ages[1] : null}</p>
          <p>твой пол: {props.gender}</p>
        </div>
        <div>
          <h3>Участники ({props.currentPeople}/{props.maxPeople}):</h3>
          {props.members ? props.members.map((data, index) => {
                return(
                  <Link to={`/profile/${data.login}`} className="desk-info__link" key={index}>
                    <div>{data.login}, {((new Date().getTime() - new Date(data.date_birth)) / (24 * 3600 * 365.25 * 1000)) | 0}</div>
                  </Link>
                )
              }) : null}
        </div>
        <div>
          <h3>Жанры:</h3>
          {props.genre ? <ChipsArray tags={props.genre} /> : null}
        </div>
        <div>
          <h3>Игры:</h3>
          {props.game ? <ChipsArray tags={props.game} /> : null}
        </div>
      </div>
    </Card>
  );
}