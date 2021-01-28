import { App, defineAsyncComponent } from 'vue';

export const registerBaseComponents = (app: App) => {
  app.component('BaseInput', defineAsyncComponent(
    () => new Promise((resolve) => resolve(import('@/components/base/BaseInput.vue'))),
  ));
  app.component('BaseLoader', defineAsyncComponent(
    () => new Promise((resolve) => resolve(import('@/components/base/BaseLoader.vue'))),
  ));
};
