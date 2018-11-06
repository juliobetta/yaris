import i18next from 'i18next';
import * as en from './en';
import { EN } from '../config/constants';

export const resources = { [EN]: { translation: { ...en } } };

/**
 * Basic i18next configuration
 * @see https://www.i18next.com/ for more details
 */
i18next
  .init({
    interpolation: {
      escapeValue: false
    },
    returnObjects: true,
    lng: EN,
    resources
  });

export default i18next;
