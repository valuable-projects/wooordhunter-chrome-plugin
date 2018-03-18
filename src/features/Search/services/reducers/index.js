import {
  FINISHED_LOAD_WORD,
  FINISHED_LOAD_WORD_TIPS,
  UPDATE_WORD,
} from '../constants';

const initialState = {
  word: '',
  wordInfo: {},
  tips: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WORD: return { ...state, word: action.payload.word };

    case FINISHED_LOAD_WORD: return { ...state, wordInfo: action.payload };

    case FINISHED_LOAD_WORD_TIPS: return { ...state, tips: action.payload.tips.map(v => v.w) };

    default: return state;
  }
};
