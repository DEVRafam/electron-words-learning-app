import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
// load sub composables
import _useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";
import _useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import _useImporting from "@/composable/datasets_manager/submodules/useImporting";
// load utils
import _selectDataset from "@/composable/datasets_manager/__utils/selectDataset";
import _blockSaveButton from "@/composable/datasets_manager/__utils/blockSaveButton";
import _saveChanges from "@/composable/datasets_manager/__utils/saveChanges";
// use sub composables
export const useGeneralInformations = _useGeneralInformations;
export const useWordsManager = _useWordsManager;
export const useImporting = _useImporting;
// use utils
export const selectDataset = _selectDataset;
export const blockSaveButton = _blockSaveButton;
export const saveChanges = _saveChanges;
// general properites
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
//
watch(
    datasetToModify,
    (val) => {
        useWordsManager.resetWordsManagerData();
        useGeneralInformations.initValues(val);
    },
    { deep: true }
);
watch(previewModifySection, () => {
    useWordsManager.currentWordsSection.value = "current";
});
//
//
//
export default {
    useGeneralInformations,
    useWordsManager,
    useImporting,
    //
    //
    datasetToModify,
    //
    isDatasetSelected,
    selectDataset,
    previewModifySection,
    blockSaveButton,
    saveChanges,
};
