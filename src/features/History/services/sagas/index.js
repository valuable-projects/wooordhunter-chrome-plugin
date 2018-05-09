import { call, put, takeEvery } from 'redux-saga/effects';

import {
  GET_WORDS_FROM_HISTORY,
  GET_WORDS_FROM_HISTORY_SUCCESS,
  DELETE_WORD_FROM_HISTORY,
  DELETE_WORD_FROM_HISTORY_SUCCESS,
} from '../constants';

import WordsHistory from '../../../../services/dao/WordsHistory';

const Words = new WordsHistory();

export function* getWordFromHistory(action) {
  try {
    const { query } = action.payload;
    const words = yield call(Words.getAll.bind(Words), query);

    yield put({
      type: GET_WORDS_FROM_HISTORY_SUCCESS,
      payload: {
        words: words.map(record => ({ id: record.id, word: record.word })),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function* deleteWordFromHistory(action) {
  try {
    const { id } = action.payload;

    yield call(Words.deleteById.bind(Words), id);

    yield put({
      type: DELETE_WORD_FROM_HISTORY_SUCCESS,
      payload: { id },
    });
  } catch (error) {
    console.error(error);
  }
}

export default function* wordHistorySagas(decorate) {
  yield takeEvery(GET_WORDS_FROM_HISTORY, decorate(getWordFromHistory));
  yield takeEvery(DELETE_WORD_FROM_HISTORY, decorate(deleteWordFromHistory));
}
