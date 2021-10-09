import { createApp } from "vue";
import App from "./app/AppSuspenseWrapper.vue";
import router from "./router";
const app = createApp(App).use(router);
//
import "@/sass/main.sass";
import "@/helpers/index";
//
// icons
//
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faChartPie,
    faChartBar,
    faExpandAlt,
    faFileUpload,
    faTimesCircle,
    faCheckCircle,
    faExclamationCircle,
    faSignOutAlt,
    faExpandArrowsAlt,
    faCompressAlt,
    faUndoAlt,
    faVolumeUp,
    faGlobeEurope,
    faImage,
    faCalendarAlt,
    faClock,
    faFire,
    faCog,
    faLock,
    faFileImport,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChartPie, faChartBar, faExpandAlt, faFileUpload, faTimesCircle, faCheckCircle, faExclamationCircle, faSignOutAlt, faExpandArrowsAlt, faCompressAlt, faUndoAlt, faVolumeUp, faGlobeEurope, faImage, faCalendarAlt, faClock, faFire, faCog, faLock, faFileImport);
app.component("font-awesome-icon", FontAwesomeIcon);
//
// global components
//
import LoadingScreen from "@/components/__global/LoadingScreen.vue";
import ChartWrapper from "@/components/__global/ChartWrapper.vue";
app.component("LoadingScreen", LoadingScreen);
app.component("ChartWrapper", ChartWrapper);

document.title = "Electron Jezyki";
app.mount("#app");
