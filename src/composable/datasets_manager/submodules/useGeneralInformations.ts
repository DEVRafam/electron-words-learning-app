import UseGeneralInformations from "@/types/compositions/datasets_manager/_useGeneralInformations";
import { ref, watch } from "vue";
// load utils
import _loadAllIcons from "@/composable/datasets_manager/__utils/general_informations/loadAllIcons";
import _betterIconName from "@/composable/datasets_manager/__utils/general_informations/betterIconName";
import _initValues from "@/composable/datasets_manager/__utils/general_informations/initValues";
import _selectCustomIcon from "@/composable/datasets_manager/__utils/general_informations/selectCustomIcon";
import _iconBackgroundImage from "@/composable/datasets_manager/__utils/iconBackgroundImage";
import _restrictions from "@/composable/datasets_manager/__utils/general_informations/restrictions";
// use utils
export const loadAllIcons = _loadAllIcons;
export const betterIconName = _betterIconName;
export const initValues = _initValues;
export const selectCustomIcon = _selectCustomIcon;
export const iconBackgroundImage = _iconBackgroundImage;
export const restrictions = _restrictions;
//
// general properties
//
export const title = ref<string>("");
export const description = ref<string>("");
export const iconName = ref<string>("");
export const fancyLetters = ref<string[]>([]);
export const language = ref<string | false>(false);
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
    // Properties:
    title,
    description,
    iconName,
    iconsList,
    fancyLetters,
    displaySelectIconPanel,
    customIcon,
    customIconURL,
    iconBackgroundImage,
    restrictions,
    language,
    // methods SYNC:
    selectCustomIcon,
    betterIconName,
    // methods ASYNC:
    loadAllIcons,
    initValues,
} as UseGeneralInformations;
