import { createApp } from "vue";
import App from "./App.vue";

import router from './router/index.js';

import "./assets/styles.css";
import "./assets/button.scss"; 
import "./script.js";

import "bootstrap/dist/css/bootstrap.css"; 
import "bootstrap/dist/js/bootstrap.bundle.js";

createApp(App).use(router).mount("#app");
