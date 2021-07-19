import { computed } from "vue";
import { ArchivedWord } from "@/types/Word";
import { datasetArchivedWords, datasetWordsProgress } from "@/composable/datasets_manager/useModifier";
import { tableFilters, wordsToRestore } from "@/composable/datasets_manager/submodules/useWordsManager";

export default computed<ArchivedWord[]>(() => {
    if (datasetArchivedWords.value instanceof Array) {
        let result = datasetArchivedWords.value;
        const { onlySelected, progress } = tableFilters.archived;
        // prepared for restore
        if (onlySelected.value) {
            result = result.filter((word: ArchivedWord) => wordsToRestore.value.includes(word));
        }
        if (progress.value === "common") {
            result = result.filter((word: ArchivedWord) => {
                // eslint-disable-next-line
                return !(datasetWordsProgress.value as any)[word.expected];
            });
        }
        // progress filter
        else if (progress.value !== "all") {
            result = result.filter((word: ArchivedWord) => {
                // eslint-disable-next-line
                return (datasetWordsProgress.value as any)[word.expected] === progress.value;
            });
        }
        //
        return result;
    } else return [] as ArchivedWord[];
});
