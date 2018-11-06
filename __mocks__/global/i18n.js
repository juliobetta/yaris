import { get } from 'lodash';
import { EN } from '../../src/app/config/constants';
import { resources } from '../../src/app/i18n';

export default () => {
  const mockFn = () => (
    ({
      t: jest.fn(path => (
        get(resources[EN].translation, path)
      ))
    })
  );

  const I18nMock = jest.mock('../../src/app/i18n', mockFn);
  global.I18n = I18nMock;
};
