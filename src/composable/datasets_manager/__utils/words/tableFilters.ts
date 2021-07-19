import { ref, Ref, ComputedRef } from "vue";
import Word, { ArchivedWord } from "@/types/Word";

import filteredCurrentWords from "./filteredCurrentWords";
import filtredArchivedWords from "./filtredArchivedWords";

interface SingleTableFilter<T extends Word | ArchivedWord> {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "common" | "weak" | "strong" | "mastered">;
    words: ComputedRef<T[]>;
}
interface TableFilters {
    current: SingleTableFilter<Word>;
    archived: SingleTableFilter<ArchivedWord>;
}

export default {
    current: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: filteredCurrentWords,
    },
    archived: {
        onlySelected: ref(false),
        progress: ref("all"),
        words: filtredArchivedWords,
    },
} as TableFilters;
