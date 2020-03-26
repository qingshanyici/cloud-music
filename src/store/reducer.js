//全局的reducer,将reducer注册为全局的reducer

import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../application/Recommend/store/index';
import { reducer as singersReducer } from '../application/Singers/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer,
});




