import { get } from 'lodash';
import { EN } from '../../src/app/config/constants';
import langs from '../../src/app/i18n';

export default () => {
  const mockFn = () => (
    ({
      t: jest.fn(translation => (
        get(langs[EN], translation)
      ))
    })
  );

  const I18nMock = jest.mock('react-redux-i18n', mockFn);
  global.I18n = I18nMock;
};
