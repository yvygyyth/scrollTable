import { createApp } from 'vue';
import App from './App.vue';
import { QrcodeOutlined } from '@ant-design/icons-vue';

const app = createApp(App);

app.component('QrcodeOutlined', QrcodeOutlined);

app.mount('#app');
