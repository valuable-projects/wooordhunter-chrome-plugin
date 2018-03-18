import { all } from 'redux-saga/effects';

import searchSagas from '../../features/Search/services/sagas';

function* appSagas() {
  yield all([
    searchSagas(),
  ]);
}

export default appSagas;
