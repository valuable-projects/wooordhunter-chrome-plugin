import { all } from 'redux-saga/effects';

import searchSagas from '../../features/Search/services/sagas';
import historySagas from '../../features/History/services/sagas';

function* appSagas() {
  yield all([searchSagas(), historySagas()]);
}

export default appSagas;
