import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App).use(router);
//
import "@/sass/main.sass";
//
// icons
//
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartPie, faChartBar, faExpandAlt, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChartPie, faChartBar, faExpandAlt, faFileUpload);
app.component("font-awesome-icon", FontAwesomeIcon);

document.title = "Electron Jezyki";
app.mount("#app");
