import { computed } from "vue";
import { newWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
import { latestImportedWords } from "@/composable/datasets_manager/__utils/modifier/importing/importNewWords";

export const handleImportingUndo = () => {
    latestImportedWords.value.forEach((latestWord) => newWords.value.remove(latestWord));
    latestImportedWords.value = [];
};

export const displayUndoButton = computed<boolean>(() => {
    return latestImportedWords.value.length > 1;
});

export default { displayUndoButton, handleImportingUndo };
