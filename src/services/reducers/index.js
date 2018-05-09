import searchReducer from '../../features/Search/services/reducers';
import historyReducer from '../../features/History/services/reducers';

import loader from './loader';

export default {
  history: historyReducer,
  search: searchReducer,
  loader,
};
