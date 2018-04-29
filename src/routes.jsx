import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import reducers from './services/reducers';
import sagas from './services/sagas';

import './index.css';

import Layout from './features/Layout';
import App from './features/App';
import Search from './features/Search';
import History from './features/History';

const history = createHistory();

const logger = createLogger({ collapsed: true, diff: true });
const middleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, sagaMiddleware, logger),
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Route exact path="/" component={Search} />
        <Route path="/history" component={History} />
        <Route path="/settings" component={App} />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
