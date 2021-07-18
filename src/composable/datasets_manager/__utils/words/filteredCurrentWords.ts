import { computed } from "vue";
import Word from "@/types/Word";
import { datasetCurrentWords, datasetWordsProgress } from "@/composable/datasets_manager/useModifier";
import { onlySelected, progressFilter, wordsToDelete } from "@/composable/datasets_manager/submodules/useWordsManager";

export default computed<Word[]>(() => {
    if (datasetCurrentWords.value instanceof Array) {
        let result = datasetCurrentWords.value;
        // prepared for delete
        if (onlySelected.value) {
            result = result.filter((word: Word) => wordsToDelete.value.includes(word));
        }
        // progress filter
        if (progressFilter.value !== "all") {
            result = result.filter((word: Word) => {
                return (datasetWordsProgress.value as any)[word.expected] === progressFilter.value;
            });
        }
        //
        return result;
    } else return [] as Word[];
});
