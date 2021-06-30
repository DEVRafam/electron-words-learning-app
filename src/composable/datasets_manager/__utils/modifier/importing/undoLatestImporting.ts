import { computed } from "vue";
import { newWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
import { latestImportedWords } from "@/composable/datasets_manager/__utils/modifier/importing/importNewWords";

export const handleImportingUndo = () => {
    latestImportedWords.value.forEach((latestWord) => {
        const index = newWords.value.findIndex((target) => {
            return target.displayed === latestWord.displayed && target.expected === latestWord.expected;
        });
        newWords.value.splice(index, 1);
    });

    latestImportedWords.value = [];
};

export const displayUndoButton = computed<boolean>(() => {
    return latestImportedWords.value.length > 1;
});

export default { displayUndoButton, handleImportingUndo };
