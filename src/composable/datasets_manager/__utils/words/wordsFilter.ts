import { computed, ComputedRef } from "vue";
import { ArchivedWord } from "@/types/Word";
import CurrentWord from "@/classes/CurrentWord";
import { tableFilters, wordsToRestore, wordsToDelete } from "@/composable/datasets_manager/submodules/useWordsManager";
import { datasetCurrentWords, datasetArchivedWords, datasetWordsProgress } from "@/composable/datasets_manager/submodules/useWordsManager";

export default <T extends CurrentWord | ArchivedWord>(target: "archived" | "current"): ComputedRef<T[]> => {
    return computed<T[]>(() => {
        let result = (target === "current" ? datasetCurrentWords.value : datasetArchivedWords.value) as T[];
        if (result instanceof Array) {
            const { onlySelected, progress, searchingPhrase, type } = tableFilters[target];
            //
            // only selected words
            //
            if (onlySelected.value) {
                const selectionArea = (target === "current" ? wordsToDelete.value : wordsToRestore.value) as T[];
                result = result.filter((word: T) => selectionArea.includes(word as T));
            }
            if (progress.value === "common") {
                result = result.filter((word) => {
                    // eslint-disable-next-line
                    return !(datasetWordsProgress.value as any)[word.expected];
                });
            }
            //
            // progress filter
            //
            else if (progress.value !== "all") {
                result = result.filter((word) => {
                    // eslint-disable-next-line
                    return (datasetWordsProgress.value as any)[word.expected] === progress.value;
                });
            }
            //
            // type filter
            //
            if (type.value !== "all") {
                result = result.filter((word) => word.type === type.value);
            }
            //
            // phrase filter
            //
            if (searchingPhrase.value.length) {
                result = result.filter((word: T) => {
                    const t = searchingPhrase.value;
                    return word.expected.includes(t) || word.displayed.includes(t);
                });
            }
            return result as T[];
        } else return [] as T[];
    });
};
