import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { hideTopBar } from './topBar';
import { showSidebar } from './categoryNavBar';
import { changeHeaderTab } from './changeHeaderTab';

export default combineReducers({
  user,
  runtime,
  hideTopBar,
  showSidebar,
  changeHeaderTab,
});
