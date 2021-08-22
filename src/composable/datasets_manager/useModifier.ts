import UseModifier from "@/types/compositions/datasets_manager/_useModifier";
import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
// load submodules
import _useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";
import _useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import _useImporting from "@/composable/datasets_manager/submodules/useImporting";
// load utils
import _selectDataset from "@/composable/datasets_manager/__utils/selectDataset";
import _blockSaveButton from "@/composable/datasets_manager/__utils/blockSaveButton";
import _saveChanges from "@/composable/datasets_manager/__utils/saveChanges";
import _prepareNewDataset from "@/composable/datasets_manager/__utils/prepareNewDataset";
import _deleteDataset from "@/composable/datasets_manager/__utils/deleteDataset";
// use submodules
export const useGeneralInformations = _useGeneralInformations;
export const useWordsManager = _useWordsManager;
export const useImporting = _useImporting;
// use utils
export const selectDataset = _selectDataset;
export const blockSaveButton = _blockSaveButton;
export const saveChanges = _saveChanges;
export const prepareNewDataset = _prepareNewDataset;
export const deleteDataset = _deleteDataset;
// general properites
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const isDatasetJustCreated = computed<boolean>(() => !!datasetToModify.value?._justCreated);
export const isDeletingModalOpen = ref<boolean>(false);
export const previewModifySection = ref<boolean>(false);
export const biggerWindow = ref<boolean>(true);
//
watch(
    datasetToModify,
    (val) => {
        useWordsManager.resetWordsManagerData(!!val?._justCreated);
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
    // Submodules:
    useGeneralInformations,
    useWordsManager,
    useImporting,
    biggerWindow,
    // Properties:
    datasetToModify,
    isDatasetSelected,
    previewModifySection,
    blockSaveButton,
    isDatasetJustCreated,
    isDeletingModalOpen,
    // methods SYNC:
    selectDataset,
    prepareNewDataset,
    // methods ASYNC:
    saveChanges,
    deleteDataset,
} as UseModifier;
