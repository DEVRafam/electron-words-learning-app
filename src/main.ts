import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/sass/main.sass";

createApp(App).use(router).mount("#app");
document.title = "Electron Jezyki";
