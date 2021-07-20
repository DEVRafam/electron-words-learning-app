import { ref, Ref, ComputedRef } from "vue";
import Word, { ArchivedWord } from "@/types/Word";

import wordsFilter from "./wordsFilter";

interface SingleTableFilter<T extends Word | ArchivedWord> {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "common" | "weak" | "strong" | "mastered">;
    words: ComputedRef<T[]>;
    searchingPhrase: Ref<string>;
}
interface TableFilters {
    current: SingleTableFilter<Word>;
    archived: SingleTableFilter<ArchivedWord>;
}

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
