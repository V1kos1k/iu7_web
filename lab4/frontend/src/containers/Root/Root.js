import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import { action } from 'mobx';
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import AuthScreen from '../AuthScreen/AuthScreen';
import UserSettingsScreen from '../UserSettingsScreen/UserSettingsScreen';
import UserProfileScreen from '../UserProfileScreen/UserProfileScreen';
import CreateDeskScreen from '../CreateDeskScreen/CreateDeskScreen';
import DeskScreen from '../DeskScreen/DeskScreen';
import Loader from '../../components/Loader/Loader';
import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';
import MainScreen from '../MainScreen/MainScreen';
import ChatScreen from '../ChatScreen/ChatScreen';

import './Root.css';

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
        <Switch>
          <Route exact path="/">
            <MainScreen />
          </Route>
          <Route path="/auth">
            {this.props.authStore.isLogin ? <Redirect to="/" /> : <AuthScreen />}
          </Route>
          <Route exact path="/profile/:username" render={(props) => {
              return (
                  <Loader isLoading={this.props.authStore.isLoading} >
                    {this.props.authStore.isLogin ? <UserProfileScreen username={props.match.params.username}/> : <Redirect to="/auth" />}
                  </Loader>
              )
            }} />
          <Route path="/profile/:username/settings">
            <Loader isLoading={this.props.authStore.isLoading} >
              {this.props.authStore.isLogin ? <UserSettingsScreen /> : <Redirect to="/auth" />}
            </Loader>
          </Route>
          <Route path="/desk/new">
            <Loader isLoading={this.props.authStore.isLoading} >
              {this.props.authStore.isLogin ? <CreateDeskScreen /> : <Redirect to="/auth" />}
            </Loader>
          </Route>
          <Route path="/desk/:id" render={(props) => {
              return (
                  <Loader isLoading={this.props.authStore.isLoading}>
                    {this.props.authStore.isLogin ? <DeskScreen deskId={props.match.params.id} /> : <Redirect to="/auth" />}
                  </Loader>
              )
            }}>
          </Route>
          <Route exact path="/chats">
            <Loader isLoading={this.props.authStore.isLoading} >
              {this.props.authStore.isLogin ? <ChatScreen /> : <Redirect to="/auth" />}
            </Loader>
          </Route>
          <Route path="/chats/:id" render={(props) => {
              return (
                <Loader isLoading={this.props.authStore.isLoading} >
                  {this.props.authStore.isLogin ? <ChatScreen chatId={props.match.params.id} /> : <Redirect to="/auth" />}
                </Loader>
              )
            }}>
          </Route>
          <Route path="*">
            <NotFoundScreen isLogin={this.props.authStore.isLogin} />
          </Route>
        </Switch>
      </React.Fragment>
    )
  }
}
