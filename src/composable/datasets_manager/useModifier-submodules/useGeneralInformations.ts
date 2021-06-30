import { ref } from "vue";
// utils
import _loadAllIcons from "@/composable/datasets_manager/__utils/modifier/general_informations/loadAllIcons";
import _betterIconName from "@/composable/datasets_manager/__utils/modifier//general_informations/betterIconName";
export const loadAllIcons = _loadAllIcons;
export const betterIconName = _betterIconName;
//
// general properties
//
export const title = ref<string>("");
export const description = ref<string>("");
export const iconName = ref<string>("");
//
export const iconsList = ref<string[]>([]);
//
export default { loadAllIcons, title, description, iconName, iconsList, betterIconName };
