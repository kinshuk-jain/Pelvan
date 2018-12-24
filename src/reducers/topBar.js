import { SHOW_TOPBAR } from '../constants';

export function hideTopBar(state = true, action) {
  const { type, payload } = action;
  switch (type) {
    case SHOW_TOPBAR:
      return payload;
    default:
      return state;
  }
}
