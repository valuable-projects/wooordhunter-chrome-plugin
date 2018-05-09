import { put } from 'redux-saga/effects';

import { LOADING_FINISHED, LOADING_STARTED } from '../../constants';

const loadingDecarator = generator =>
  (function* decorator(...args) {
    yield put({ type: LOADING_STARTED });

    yield generator(...args);

    yield put({ type: LOADING_FINISHED });
  });

export {
  loadingDecarator,
};
