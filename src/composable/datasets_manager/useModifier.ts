import { ref, computed, watch } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word from "@/types/Word";
// load utils
import {
    isWordInDeletingList as _isWordInDeletingList,
    prepareWordForDeleting as _prepareWordForDeleting, //
} from "@/composable/datasets_manager/__utils/modifier/handleDeleteActions";
import _loadDatasetWords from "@/composable/datasets_manager/__utils/modifier/loadDatasetWords";
import _selectDataset from "@/composable/datasets_manager/__utils/modifier/selectDataset";
import _blockSaveButton from "@/composable/datasets_manager/__utils/modifier/blockSaveButton";
import _importOnDragAndDrop from "@/composable/datasets_manager/__utils/modifier/importing/onDragAndDrop";
import _importOnInputChange from "@/composable/datasets_manager/__utils/modifier/importing/onInputChange";
import {
    handleImportingUndo as _handleImportingUndo, //
    displayUndoButton as _displayUndoButton,
} from "@/composable/datasets_manager/__utils/modifier/importing/undoLatestImporting";
// use utils
export const isWordInDeletingList = _isWordInDeletingList;
export const prepareWordForDeleting = _prepareWordForDeleting;
export const loadDatasetWords = _loadDatasetWords;
export const selectDataset = _selectDataset;
export const blockSaveButton = _blockSaveButton;
export const importOnInputChange = _importOnInputChange;
export const importOnDragAndDrop = _importOnDragAndDrop;
export const handleImportingUndo = _handleImportingUndo;
export const displayUndoButton = _displayUndoButton;
//
// general data
//
export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const datasetWords = ref<Word[] | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
// words manager
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);
export const newWord = ref<Word>({ expected: "", displayed: "" });
export const importingResult = ref<"positive" | "negative" | null>(null);
export const amountOfImportedWords = ref<number | false>(false);
//
watch(datasetToModify, () => {
    datasetWords.value = null;
    wordsToDelete.value = [];
    newWords.value = [];
    newWord.value = { expected: "", displayed: "" };
});
watch(importingResult, (val) => {
    if (val === null) amountOfImportedWords.value = false;
    // REMEMBER ABOUT CHANGE importing_result_communique.sass
    setTimeout(() => (importingResult.value = null), 1201);
});
//
//
//
export default {
    datasetToModify,
    isDatasetSelected,
    selectDataset,
    previewModifySection,
    datasetWords,
    wordsToDelete,
    newWords,
    newWord,
    blockSaveButton,
    isWordInDeletingList,
    prepareWordForDeleting,
    loadDatasetWords,
    importOnInputChange,
    importOnDragAndDrop,
    importingResult,
    amountOfImportedWords,
    handleImportingUndo,
    displayUndoButton,
};
