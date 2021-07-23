import { computed, ComputedRef } from "vue";
import { NewWord } from "@/types/Word";
import { newWords, tableFilters } from "@/composable/datasets_manager/submodules/useWordsManager";

export default (): ComputedRef<NewWord[]> => {
    return computed<NewWord[]>(() => {
        if (tableFilters.news.origin.value === "all") return newWords.value;
        return newWords.value.filter((word) => {
            return word.origin === tableFilters.news.origin.value;
        });
    });
};
