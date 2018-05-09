import { LOADING_FINISHED, LOADING_STARTED } from '../constants';

const defaultState = {
  loadingsCount: 0,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOADING_STARTED:
      return { loadingsCount: state.loadingsCount + 1 };

    case LOADING_FINISHED:
      return { loadingsCount: Math.max(state.loadingsCount - 1, 0) };

    default: {
      return state;
    }
  }
};
