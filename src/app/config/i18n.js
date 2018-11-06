import { loadTranslations, setLocale } from 'react-redux-i18n';
import { EN } from './constants';
import translations from '../i18n';

export default function({ state, store }) {
  const navLanguage = (
    ((state.i18n && state.i18n.locale) || navigator.userLanguage) ||
    navigator.language
  );
  const language = navLanguage.substring(0, 2);

  store.dispatch(loadTranslations(translations));
  store.dispatch(setLocale((translations[language] && language) || EN));
}
