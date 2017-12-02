import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import { hideTopBar } from './topBar';
import { showSidebar } from './categoryNavBar';
import { showAddQuestion } from './additionalQuestion';
import { showNegativeFeedback } from './feedback';
import { getQuesAddedToPinBar } from './pinBar';

export default combineReducers({
  user,
  runtime,
  hideTopBar,
  showSidebar,
  showAddQuestion,
  showNegativeFeedback,
  getQuesAddedToPinBar,
});
