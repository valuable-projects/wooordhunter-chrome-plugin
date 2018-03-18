import { call, put, takeLatest } from 'redux-saga/effects';

import {
  START_LOAD_WORD,
  FINISHED_LOAD_WORD,
  FAILURE_LOAD_WORD,
  START_LOAD_WORD_TIPS,
  FINISHED_LOAD_WORD_TIPS,
  FAILURE_LOAD_WORD_TIPS,
} from '../constants';

const searchApi = 'http://wooordhunt.ru/word/';
const tipsApi = 'http://wooordhunt.ru/get_tips.php?abc=';

function* fetchWord(action) {
  try {
    const response = yield call(fetch, searchApi + action.payload.word);

    yield put({ type: FINISHED_LOAD_WORD, payload: response });
  } catch (err) {
    yield put({ type: FAILURE_LOAD_WORD });
  }
}

function* fetchWordTips(action) {
  try {
    const word = action.payload.word.toLocaleLowerCase();
    const url = 'http://localhost:8000/';
    const headers = { 'Wooorhunt-Destination-Header': tipsApi + word };
    const response = yield call(fetch, url, { headers });

    const data = yield call(response.json.bind(response));

    yield put({ type: FINISHED_LOAD_WORD_TIPS, payload: data });
  } catch (err) {
    console.log('err', err);
    yield put({ type: FAILURE_LOAD_WORD_TIPS });
  }
}

export default function* wordSagas() {
  yield takeLatest(START_LOAD_WORD, fetchWord);
  yield takeLatest(START_LOAD_WORD_TIPS, fetchWordTips);
}
