import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from './router/index.js';
import VueLazyload from 'vue-lazyload';
import { SpeedInsights } from "@vercel/speed-insights/vue";

// Import styles
import "./assets/styles.css";
import "./assets/button.scss";
import "./script.js";

// Third-party styles
import "bootstrap/dist/css/bootstrap.min.css";  // Use minified version
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // Use minified version
import 'typeface-roboto';

// Error and loading images
import errorImage from './assets/error.webp';
import loadingImage from './assets/loading.gif';

// Create app instance
const app = createApp(App);
const pinia = createPinia();

// Register plugins
app.use(pinia);
app.use(router);
app.use(VueLazyload, {
  preLoad: 1.3,
  error: errorImage,
  loading: loadingImage,
  attempt: 1,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  }
});

// Register components
app.component('SpeedInsights', SpeedInsights);

// Error handling
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err);
  console.error('Component:', instance);
  console.error('Error Info:', info);
};

// Warning handling
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Warning:', msg);
  console.warn('Component:', instance);
  console.warn('Trace:', trace);
};

// Mount app
app.mount("#app");