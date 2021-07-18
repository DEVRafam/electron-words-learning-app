import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word, { ArchivedWord } from "@/types/Word";
import { currentWordsSection, progressFilter } from "@/composable/datasets_manager/submodules/useWordsManager";
// load sub composables
import _useGeneralInformations from "@/composable/datasets_manager/submodules/useGeneralInformations";
import _useWordsManager from "@/composable/datasets_manager/submodules/useWordsManager";
import _useImporting from "@/composable/datasets_manager/submodules/useImporting";
// load utils
import _loadDatasetCurrentWords from "@/composable/datasets_manager/__utils/loaders/loadDatasetCurrentWords";
import _loadDatasetArchivedWords from "@/composable/datasets_manager/__utils/loaders/loadDatasetArchivedWords";
import _loadCrucialWords from "@/composable/datasets_manager/__utils/loaders/loadCrucialWords";
import _selectDataset from "@/composable/datasets_manager/__utils/selectDataset";
import _blockSaveButton from "@/composable/datasets_manager/__utils/blockSaveButton";
import _saveChanges from "@/composable/datasets_manager/__utils/saveChanges";
// use sub composables
export const useGeneralInformations = _useGeneralInformations;
export const useWordsManager = _useWordsManager;
export const useImporting = _useImporting;
// use utils
export const loadDatasetCurrentWords = _loadDatasetCurrentWords;
export const loadDatasetArchivedWords = _loadDatasetArchivedWords;
export const loadCrucialWords = _loadCrucialWords;
export const selectDataset = _selectDataset;
export const blockSaveButton = _blockSaveButton;
export const saveChanges = _saveChanges;
// general properites
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const datasetCurrentWords = ref<Word[] | null>(null);
export const datasetArchivedWords = ref<ArchivedWord[] | null>(null);
export const datasetWordsProgress = ref<Record<string, "weak" | "strong" | "mastered" | null> | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
//
watch(
    datasetToModify,
    (val) => {
        datasetCurrentWords.value = null;
        datasetArchivedWords.value = null;
        datasetWordsProgress.value = null;
        progressFilter.value = "all";
        useWordsManager.resetWordsManagerData();
        useGeneralInformations.initValues(val);
    },
    { deep: true }
);
watch(previewModifySection, () => {
    currentWordsSection.value = "current";
});
//
//
//
export default {
    useGeneralInformations,
    useWordsManager,
    useImporting,
    //
    loadDatasetCurrentWords,
    loadDatasetArchivedWords,
    loadCrucialWords,
    //
    datasetToModify,
    datasetCurrentWords,
    datasetArchivedWords,
    datasetWordsProgress,
    //
    isDatasetSelected,
    selectDataset,
    previewModifySection,
    blockSaveButton,
    saveChanges,
};
