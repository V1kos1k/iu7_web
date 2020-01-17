import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import { action, autorun } from 'mobx';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Container from '@material-ui/core/Container';

import Loader from './loader.jsx';
import AuthPage from './authPage.jsx';
import ChatPage from './chatPage.jsx';
import ProfileSetting from './profileSetting.jsx';
import Profile from './profile.jsx';
import DeskCreate from './deskCreate.jsx';
import DeskPage from './deskPage.jsx';
import Navbar from './navbar.jsx';
import NotFound from './notfoundPage.jsx';
import MainPage from './mainPage.jsx'
import '../styles/index.css';

@inject('authStore', 'socketStore')
@observer
export default class Root extends Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  @action checkAuth() {
    this.props.authStore.refreshToken()
      .then(action(res => {
        this.props.socketStore.connect(this.props.authStore.username);
      }));
  }

  render() {
    return(
      <React.Fragment>
        <Navbar isLogin={this.props.authStore.isLogin}/>
        <Container maxWidth="lg">
          <div className="body">
          <Switch>
            <Route path="/auth">
                {this.props.authStore.isLogin ? <Redirect to="/" /> : <AuthPage />}
            </Route>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/profile/:username" render={(props) => {
              return (
                  <Loader isLoading={this.props.authStore.isLoading} >
                    {this.props.authStore.isLogin ? <Profile username={props.match.params.username}/> : <Redirect to="/auth" />}
                  </Loader>
              )
            }}>
            </Route>
            <Route path="/profile/:username/settings">
              <Loader isLoading={this.props.authStore.isLoading} >
                {this.props.authStore.isLogin ? <ProfileSetting /> : <Redirect to="/auth" />}
              </Loader>
            </Route>
            <Route path="/desk/new">
              <Loader isLoading={this.props.authStore.isLoading} >
                {this.props.authStore.isLogin ? <DeskCreate /> : <Redirect to="/auth" />}
              </Loader>
            </Route>
            <Route path="/desk/:id">
              <Loader isLoading={this.props.authStore.isLoading} >
                {this.props.authStore.isLogin ? <DeskPage /> : <Redirect to="/auth" />}
              </Loader>
            </Route>
            <Route exact path="/chats">
              <Loader isLoading={this.props.authStore.isLoading} >
                {this.props.authStore.isLogin ? <ChatPage /> : <Redirect to="/auth" />}
              </Loader>
            </Route>
            <Route path="/chats/:id" render={(props) => {
                    return (
                      <Loader isLoading={this.props.authStore.isLoading} >
                        {this.props.authStore.isLogin ? <ChatPage chatId={props.match.params.id} /> : <Redirect to="/auth" />}
                      </Loader>
                    )
                  }}>
            </Route>
            <Route path="*">
              <NotFound />
          </Route>
          </Switch>
          </div>
          </Container>
      </React.Fragment>
    )
  }
}
