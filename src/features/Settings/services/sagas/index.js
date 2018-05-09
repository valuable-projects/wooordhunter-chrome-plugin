import { call, put, takeEvery } from 'redux-saga/effects';

import { CLEAR_HISTORY } from '../constants';

import WordsHistory from '../../../../services/dao/WordsHistory';

const Words = new WordsHistory();

export function* clearWordsHistory() {
  try {
    yield call(Words.clear.bind(Words));
  } catch (error) {
    console.error(error);
  }
}

export default function* wordHistorySagas(decorate) {
  yield takeEvery(CLEAR_HISTORY, decorate(clearWordsHistory));
}
