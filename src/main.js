import { createApp } from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
// https://www.jianshu.com/p/21e76ecda50e
// 加入leaflet.css使地圖更完整
import 'leaflet/dist/leaflet.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App);
app.use(VueAxios, axios);
app.mount('#app');
