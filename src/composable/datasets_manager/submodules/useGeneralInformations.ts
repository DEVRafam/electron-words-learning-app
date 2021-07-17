import { ref, watch } from "vue";
// load utils
import _loadAllIcons from "@/composable/datasets_manager/__utils/general_informations/loadAllIcons";
import _betterIconName from "@/composable/datasets_manager/__utils/general_informations/betterIconName";
import _initValues from "@/composable/datasets_manager/__utils/general_informations/initValues";
import _selectCustomIcon from "@/composable/datasets_manager/__utils/general_informations/selectCustomIcon";
import _iconBackgroundImage from "@/composable/datasets_manager/__utils/iconBackgroundImage";
// use utils
export const loadAllIcons = _loadAllIcons;
export const betterIconName = _betterIconName;
export const initValues = _initValues;
export const selectCustomIcon = _selectCustomIcon;
export const iconBackgroundImage = _iconBackgroundImage;
//
// general properties
//
export const title = ref<string>("");
export const description = ref<string>("");
export const iconName = ref<string>("");
export const fancyLetters = ref<string[]>([]);
//
export const iconsList = ref<string[]>([]);
export const displaySelectIconPanel = ref<boolean | null>(false);
export const customIcon = ref<File | null>(null);
export const customIconURL = ref<string | null>(null);
//
watch(iconName, () => {
    customIcon.value = null;
    customIconURL.value = null;
});
//
//
//
export default {
    loadAllIcons, //
    title,
    description,
    iconName,
    iconsList,
    betterIconName,
    fancyLetters,
    initValues,
    displaySelectIconPanel,
    selectCustomIcon,
    customIcon,
    customIconURL,
    iconBackgroundImage,
};
