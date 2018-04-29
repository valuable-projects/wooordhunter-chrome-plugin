import { DELETE_WORD_FROM_HISTORY_SUCCESS, GET_WORDS_FROM_HISTORY_SUCCESS } from '../constants';

const initialState = {
  words: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS_FROM_HISTORY_SUCCESS: {
      return {
        ...state,
        words: action.payload.words,
      };
    }

    case DELETE_WORD_FROM_HISTORY_SUCCESS: {
      const { words: prevWords } = state;

      const nextWords = prevWords.filter(word => word.id !== action.payload.id);

      return {
        ...state,
        words: nextWords,
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
