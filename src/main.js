import { createApp } from "vue";
import App from "./App.vue";

import router from './router/index.js';

import "./assets/styles.css";
import "./assets/global.css"; 
import "./assets/button.scss"; 
import "./script.js";

import "bootstrap/dist/css/bootstrap.css"; // Include Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.js"; // Include Bootstrap JS (if needed)


createApp(App).use(router).mount("#app");
