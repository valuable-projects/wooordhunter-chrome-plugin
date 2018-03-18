import { call, put, takeLatest } from 'redux-saga/effects';

import {
  START_LOAD_WORD,
  FINISHED_LOAD_WORD,
  FAILURE_LOAD_WORD,
  START_LOAD_WORD_TIPS,
  FINISHED_LOAD_WORD_TIPS,
  FAILURE_LOAD_WORD_TIPS,
} from '../constants';
import parse from '../parseWooordhuntPage';

const searchApi = 'http://wooordhunt.ru/word/';
const tipsApi = 'http://wooordhunt.ru/get_tips.php?abc=';

const proxyUrl = 'http://localhost:8000/';

function* fetchWord(action) {
  try {
    const word = action.payload.word.toLocaleLowerCase();
    const headers = { 'Wooorhunt-Destination-Header': searchApi + word };
    const response = yield call(fetch, proxyUrl, { headers });

    const text = yield call(response.text.bind(response));

    const parsedPage = yield call(parse, word, text);

    console.log('parsedPage', parsedPage);

    yield put({ type: FINISHED_LOAD_WORD, payload: { wordInfo: parsedPage } });
  } catch (err) {
    console.log('err', err);
    yield put({ type: FAILURE_LOAD_WORD });
  }
}

function* fetchWordTips(action) {
  try {
    const word = action.payload.word.toLocaleLowerCase();
    const headers = { 'Wooorhunt-Destination-Header': tipsApi + word };
    const response = yield call(fetch, proxyUrl, { headers });

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