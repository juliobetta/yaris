import MockDate from 'mockdate';
import globalMocks from './global';

MockDate.set('5/10/2018');
globalMocks.forEach(mock => mock());
