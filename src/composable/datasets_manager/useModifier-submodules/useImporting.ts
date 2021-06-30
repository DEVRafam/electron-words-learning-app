import { ref, watch } from "vue";
import { amountOfImportedWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
// load utils
import _importOnDragAndDrop from "@/composable/datasets_manager/__utils/modifier/importing/onDragAndDrop";
import _importOnInputChange from "@/composable/datasets_manager/__utils/modifier/importing/onInputChange";
import {
    handleImportingUndo as _handleImportingUndo, //
    displayUndoButton as _displayUndoButton,
} from "@/composable/datasets_manager/__utils/modifier/importing/undoLatestImporting";
// use utils
export const importOnInputChange = _importOnInputChange;
export const importOnDragAndDrop = _importOnDragAndDrop;
export const handleImportingUndo = _handleImportingUndo;
export const displayUndoButton = _displayUndoButton;
// properites
export const importingResult = ref<"positive" | "negative" | null>(null);
//
watch(importingResult, (val) => {
    if (val === null) amountOfImportedWords.value = false;
    setTimeout(() => (importingResult.value = null), 1201); // REMEMBER ABOUT CHANGE importing_result_communique.sass
});
//
export default { importingResult, importOnInputChange, importOnDragAndDrop, handleImportingUndo, displayUndoButton };
