import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App).use(router);
//
import "@/sass/main.sass";
import "@/helpers/index";
//
// icons
//
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChartPie, faChartBar, faExpandAlt, faFileUpload, faTimesCircle, faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChartPie, faChartBar, faExpandAlt, faFileUpload, faTimesCircle, faCheckCircle, faExclamationCircle);
app.component("font-awesome-icon", FontAwesomeIcon);

document.title = "Electron Jezyki";
app.mount("#app");
