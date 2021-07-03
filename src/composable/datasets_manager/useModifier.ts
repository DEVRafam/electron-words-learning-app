import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word from "@/types/Word";
// load sub composables
import _useGeneralInformations from "@/composable/datasets_manager/useModifier-submodules/useGeneralInformations";
import _useWordsManager from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
import _useImporting from "@/composable/datasets_manager/useModifier-submodules/useImporting";
// load utils
import _loadDatasetWords from "@/composable/datasets_manager/__utils/modifier/loadDatasetWords";
import _selectDataset from "@/composable/datasets_manager/__utils/modifier/selectDataset";
import _blockSaveButton from "@/composable/datasets_manager/__utils/modifier/blockSaveButton";
// use sub composables
export const useGeneralInformations = _useGeneralInformations;
export const useWordsManager = _useWordsManager;
export const useImporting = _useImporting;
// use utils
export const loadDatasetWords = _loadDatasetWords;
export const selectDataset = _selectDataset;
export const blockSaveButton = _blockSaveButton;
// general properites
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const datasetWords = ref<Word[] | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
//
watch(
    datasetToModify,
    (val) => {
        datasetWords.value = null;
        useWordsManager.resetWordsManagerData();
        useGeneralInformations.initValues(val);
    },
    { deep: true }
);
//
//
//
export default {
    useGeneralInformations,
    useWordsManager,
    useImporting,
    //
    datasetToModify,
    isDatasetSelected,
    selectDataset,
    previewModifySection,
    datasetWords,
    blockSaveButton,
    loadDatasetWords,
};
