import { computed } from "vue";
import { customIconURL, iconName } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { gameplaysIconPathResolver } from "@/composable/datasets_loaders/useDatasetsLoader";

export default computed<string>(() => {
    if (customIconURL.value) return `background-image: url(${customIconURL.value})`;
    else return gameplaysIconPathResolver(iconName.value);
});
