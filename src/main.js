import { createApp } from "vue";
import App from "./App.vue";
import router from './router/index.js';
import VueLazyload from 'vue-lazyload';
import { SpeedInsights } from "@vercel/speed-insights/vue";

import "./assets/styles.css";
import "./assets/button.scss";
import "./script.js";

import "bootstrap/dist/css/bootstrap.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import 'typeface-roboto';

const app = createApp(App);

app.use(router);

app.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/error.webp'),
  loading: require('./assets/loading.gif'),
  attempt: 1
});

app.component('SpeedInsights', SpeedInsights);

app.mount("#app");
