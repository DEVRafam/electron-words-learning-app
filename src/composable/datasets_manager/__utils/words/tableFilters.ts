import { ref, computed, ComputedRef } from "vue";
import { ArchivedWord, NewWord } from "@/types/Word";
import CurrentWord from "@/classes/CurrentWord";
import { TableFilters } from "@/types/compositions/datasets_manager/_useWordsManager";
import { newWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import wordsFilter from "./wordsFilter";
import newWordsFilter from "./newWordsFilter";

export default {
    current: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: wordsFilter<CurrentWord>("current"),
        searchingPhrase: ref(""),
    },
    archived: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: wordsFilter<ArchivedWord>("archived"),
        searchingPhrase: ref(""),
    },
    news: {
        possibleOrigins: computed<string[]>(() => {
            const origins = newWords.value.map((el: NewWord) => el.origin);
            return [...new Set(origins)];
        }),
        origin: ref("all"),
        words: newWordsFilter() as ComputedRef<NewWord[]>,
    },
} as TableFilters;
