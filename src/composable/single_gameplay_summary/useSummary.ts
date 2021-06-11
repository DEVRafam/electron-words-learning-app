import { ref } from "vue";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
// utils
import { loadLogFile as _loadLogFile } from "@/composable/single_gameplay_summary/__utils/loadLogFile";
import {
    emphasizedWordsCategory as _emphasizedWordsCategory, //
    setEmphasize as _setEmphasize,
    emphasizeOnCSSClassWrapper as _emphasizeOnCSSClassWrapper,
    emphasizeOnCSSClassButton as _emphasizeOnCSSClassButton,
    emphasizedWordsList as _emphasizedWordsList,
} from "@/composable/single_gameplay_summary/__utils/emphasize";
// load utils
export const emphasizedWordsCategory = _emphasizedWordsCategory;
export const setEmphasize = _setEmphasize;
export const emphasizeOnCSSClassWrapper = _emphasizeOnCSSClassWrapper;
export const emphasizeOnCSSClassButton = _emphasizeOnCSSClassButton;
export const emphasizedWordsList = _emphasizedWordsList;
//
export const data = ref<ProgressLogFile>({} as ProgressLogFile);
export const loadLogFile = async (name: string): Promise<boolean> => await _loadLogFile(data, name);

export default { data, loadLogFile, emphasizedWordsCategory, setEmphasize, emphasizeOnCSSClassWrapper, emphasizeOnCSSClassButton, emphasizedWordsList };
