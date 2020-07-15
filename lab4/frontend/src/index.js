import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './index.css';

import Root from './containers/Root/Root';

import BackendApi from './api/backendApi';
import AuthStore from './store/authStore';
import UserStore from './store/userStore';
import DeskStore from './store/deskStore';
import ChatStore from './store/chatStore';
import SocketStore from './store/socketStore';
import NotificationStore from "./store/notificationStore";

const api = new BackendApi(),
  authStore = new AuthStore(api),
  userStore = new UserStore(api),
  deskStore = new DeskStore(api),
  socketStore = new SocketStore(api),
  chatStore = new ChatStore(api, socketStore, userStore),
  notificationStore = new NotificationStore(socketStore, userStore, deskStore);

const stores = {
  api,

  authStore,
  userStore,
  deskStore,
  chatStore,
  socketStore,
  notificationStore
};

ReactDOM.render(
  <React.Fragment>
    <Provider {...stores}>
      <Router>
        <Root />
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
