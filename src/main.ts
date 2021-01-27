import { createApp } from 'vue';
import { registerBaseComponents } from '@/register-base-components';
import App from './App.vue';

const app = createApp(App);

registerBaseComponents(app);

app.mount('#app');
