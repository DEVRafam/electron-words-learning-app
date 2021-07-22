import { ref } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
import { TableFilters } from "@/types/compositions/datasets_manager/useWordsManager";
import wordsFilter from "./wordsFilter";

export default {
    current: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: wordsFilter<Word>("current"),
        searchingPhrase: ref(""),
    },
    archived: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: wordsFilter<ArchivedWord>("archived"),
        searchingPhrase: ref(""),
    },
} as TableFilters;
