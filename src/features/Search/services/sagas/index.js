import { call, put, takeEvery } from 'redux-saga/effects';

import {
  START_LOAD_WORD,
  FINISHED_LOAD_WORD,
  FAILURE_LOAD_WORD,
  START_LOAD_WORD_TIPS,
  FINISHED_LOAD_WORD_TIPS,
  FAILURE_LOAD_WORD_TIPS,
} from '../constants';
import parse from '../parser';
import WordsHistory from '../../../../services/dao/WordsHistory';

import config from '../../../../config';

const Words = new WordsHistory();

function* fetchWord(action) {
  try {
    const word = action.payload.word.toLocaleLowerCase();
    let wordInfo = yield call(Words.getByWord.bind(Words), word);

    if (!wordInfo) {
      const headers = {
        'Wooorhunt-Destination-Header': config.wooordhuntSearchApi + encodeURIComponent(word),
      };
      const response = yield call(fetch, config.proxyUrl, { headers });

      const text = yield call(response.text.bind(response));

      wordInfo = yield call(parse, word, text);

      yield call(Words.save.bind(Words), wordInfo);
    }

    yield put({ type: FINISHED_LOAD_WORD, payload: { wordInfo } });
  } catch (err) {
    console.error(err);
    yield put({ type: FAILURE_LOAD_WORD });
  }
}

function* fetchWordTips(action) {
  try {
    const word = action.payload.word.toLocaleLowerCase();
    const headers = {
      'Wooorhunt-Destination-Header': config.wooordhuntTipsApi + encodeURIComponent(word),
    };
    const response = yield call(fetch, config.proxyUrl, { headers });

    const data = yield call(response.json.bind(response));

    yield put({ type: FINISHED_LOAD_WORD_TIPS, payload: data });
  } catch (err) {
    console.error(err);
    yield put({ type: FAILURE_LOAD_WORD_TIPS });
  }
}

export default function* wordSagas(decorate) {
  yield takeEvery(START_LOAD_WORD, decorate(fetchWord));
  yield takeEvery(START_LOAD_WORD_TIPS, decorate(fetchWordTips));
}
