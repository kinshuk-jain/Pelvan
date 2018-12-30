import { CHANGE_HEADER_TAB } from '../constants';

export function changeTab(payload = 0) {
  return {
    type: CHANGE_HEADER_TAB,
    payload,
  };
}
