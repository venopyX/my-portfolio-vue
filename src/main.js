import { createApp } from "vue";
import App from "./App.vue";

import "./assets/styles.css"; // Import the existing CSS
import "./assets/global.css"; // Import the existing CSS
import "./script.js"; // Retain the original JS behavior

import "bootstrap/dist/css/bootstrap.css"; // Include Bootstrap styles
import "bootstrap/dist/js/bootstrap.bundle.js"; // Include Bootstrap JS (if needed)


createApp(App).mount("#app");
