import React from 'react';

import Container from '../../components/Container/Container';
import Navbar from '../../components/Navbar/Navbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Content from '../../components/Content/Content';
import Button from '../../components/Button/Button';

import { Link } from "react-router-dom";
import './NotFoundScreen.css'
import itsfine from '../../../static/img/itsfine.svg';

export default function NotFoundScreen (props) {
  return(
    <React.Fragment>
      <Container>
      <Navbar isLogin={props.isLogin}/>
        <Content modifiers="content_theme_notfound">
          <Card className="notfound__description">
            <CardContent>
                <h2>Ой-ой! А страницы такой нет!</h2>
                <img src={itsfine} className = "notfound__image"/>
                <p>
                    Мы не смогли найти запрашиваемую Вами страницу.<br />
                    Но все в порядке, можно просто вернуться домой!<br />
                </p>
                <Link to="/" className="notfound__link">
                    <Button buttonText="Домой" />
                </Link>
            </CardContent>
          </Card>
        </Content>
      </Container>
    </React.Fragment>
  );
}