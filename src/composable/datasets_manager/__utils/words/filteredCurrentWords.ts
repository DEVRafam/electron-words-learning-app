import { computed } from "vue";
import Word from "@/types/Word";
import { datasetCurrentWords, datasetWordsProgress } from "@/composable/datasets_manager/useModifier";
import { tableFilters, wordsToDelete } from "@/composable/datasets_manager/submodules/useWordsManager";

export default computed<Word[]>(() => {
    if (datasetCurrentWords.value instanceof Array) {
        let result = datasetCurrentWords.value;
        const { onlySelected, progress } = tableFilters.current;
        // prepared for delete
        if (onlySelected.value) {
            result = result.filter((word: Word) => wordsToDelete.value.includes(word));
        }
        // progress filter
        if (progress.value !== "all") {
            result = result.filter((word: Word) => {
                // eslint-disable-next-line
                return (datasetWordsProgress.value as any)[word.expected] === progress.value;
            });
        }
        //
        return result;
    } else return [] as Word[];
});
