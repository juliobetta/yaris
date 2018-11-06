import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import '../../src/theme/index.scss';
import './theme.scss';

const req = require.context('../../src/app/components', true, /\.stories\.js$/);

setOptions({
  sidebarAnimations: false
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
