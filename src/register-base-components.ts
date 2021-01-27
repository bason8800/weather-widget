import { App } from 'vue';

import BaseInput from '@/components/base/BaseInput.vue';
import BaseLoader from '@/components/base/BaseLoader.vue';

export const registerBaseComponents = (app: App) => {
  app.component('BaseInput', BaseInput);
  app.component('BaseLoader', BaseLoader);
};
