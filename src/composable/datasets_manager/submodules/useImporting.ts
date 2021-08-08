import UseImporting from "@/types/compositions/datasets_manager/_useImporting";
import { ref, watch } from "vue";
import { amountOfImportedWords } from "@/composable/datasets_manager/submodules/useWordsManager";
// load utils
import _importOnDragAndDrop from "@/composable/datasets_manager/__utils/importing/onDragAndDrop";
import _importOnInputChange from "@/composable/datasets_manager/__utils/importing/onInputChange";
import {
    handleImportingUndo as _handleImportingUndo, //
    displayUndoButton as _displayUndoButton,
} from "@/composable/datasets_manager/__utils/importing/undoLatestImporting";
// use utils
export const importOnInputChange = _importOnInputChange;
export const importOnDragAndDrop = _importOnDragAndDrop;
export const handleImportingUndo = _handleImportingUndo;
export const displayUndoButton = _displayUndoButton;
// properites
export const importingResult = ref<"positive" | "negative" | null>(null);
export const dragging = ref<boolean>(false);
//
watch(importingResult, (val) => {
    if (val === null) amountOfImportedWords.value = false;
    setTimeout(() => (importingResult.value = null), 1201); // REMEMBER ABOUT CHANGE importing_result_communique.sass
});
//
export default {
    // Properties:
    importingResult,
    displayUndoButton,
    dragging,
    // methods SYNC:
    handleImportingUndo,
    // methods ASYNC:
    importOnInputChange,
    importOnDragAndDrop,
} as UseImporting;
