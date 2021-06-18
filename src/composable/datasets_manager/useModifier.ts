import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word from "@/types/Word";
// load utils
import {
    isWordInDeletingList as _isWordInDeletingList,
    prepareWordForDeleting as _prepareWordForDeleting,
    //
} from "@/composable/datasets_manager/__utils/modifier/handleDeleteActions";
import _loadDatasetWords from "@/composable/datasets_manager/__utils/modifier/loadDatasetWords";
// use utils
export const isWordInDeletingList = _isWordInDeletingList;
export const prepareWordForDeleting = _prepareWordForDeleting;
export const loadDatasetWords = _loadDatasetWords;
// own stuff
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const datasetWords = ref<Word[] | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);

export const selectDataset = (val: GameplayDataFileForPreview | null) => {
    previewModifySection.value = !!val;
    datasetToModify.value = val;
};

export const blockSaveButton = computed<boolean>(() => {
    return !wordsToDelete.value.length && !newWords.value.length;
});

watch(datasetToModify, () => {
    datasetWords.value = null;
    wordsToDelete.value = [];
    newWords.value = [];
});

export default { datasetToModify, isDatasetSelected, selectDataset, previewModifySection, datasetWords, wordsToDelete, newWords, blockSaveButton, isWordInDeletingList, prepareWordForDeleting, loadDatasetWords };
