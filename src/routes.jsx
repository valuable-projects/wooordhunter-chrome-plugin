import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './services/reducers';

import './index.css';

import Layout from './features/Layout';
import App from './features/App';
import Search from './features/Search';

const history = createHistory();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Route exact path="/" component={Search} />
        <Route path="/history" component={App} />
        <Route path="/settings" component={App} />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
