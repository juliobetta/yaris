export const REDUX_STATE_KEY = 'reduxState';

/**
 * Get persisted state from localStorage
 * @return {Object}
 */
export const getState = () => {
  const state = window.localStorage.getItem(REDUX_STATE_KEY);
  return state ? JSON.parse(state) : {};
};

/**
 * Persist redux state on localStorage
 * @param  {Object} state
 * @return {void}
 */
export const persistState = state => {
  const { i18n } = state;

  window.localStorage.setItem(REDUX_STATE_KEY, JSON.stringify({
    i18n
  }));
};
