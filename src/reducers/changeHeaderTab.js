import { CHANGE_HEADER_TAB } from '../constants';

export function changeHeaderTab(state = 0, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_HEADER_TAB:
      return payload;
    default:
      return state;
  }
}
