import { App, defineAsyncComponent } from 'vue';

const components = [
  'BaseInput',
  'BaseLoader',
];

export const registerBaseComponents = (app: App) => {
  components.forEach((component) => {
    app.component(component, defineAsyncComponent(
      () => new Promise((resolve) => resolve(import(`@/components/base/${component}.vue`))),
    ));
  });
};
