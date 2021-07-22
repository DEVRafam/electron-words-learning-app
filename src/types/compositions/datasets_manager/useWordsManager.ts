import { Ref, ComputedRef } from "vue";
import Word, { ArchivedWord } from "@/types/Word";

interface SingleTableFilter<T extends Word | ArchivedWord> {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "common" | "weak" | "strong" | "mastered">;
    words: ComputedRef<T[]>;
    searchingPhrase: Ref<string>;
}
export interface TableFilters {
    current: SingleTableFilter<Word>;
    archived: SingleTableFilter<ArchivedWord>;
}

export default interface UseWordsManager {
    // Properties:
    datasetCurrentWords: Ref<Word[] | null>;
    datasetArchivedWords: Ref<ArchivedWord[] | null>;
    datasetWordsProgress: Ref<Record<string, "weak" | "strong" | "mastered" | null> | null>;
    wordsToDelete: Ref<Word[]>;
    newWords: Ref<Word[]>;
    newWord: Ref<Word>;
    wordsToRestore: Ref<ArchivedWord[]>;
    progressFilter: Ref<"all" | "weak" | "strong" | "mastered">;
    amountOfImportedWords: Ref<number | false>;
    currentWordsSection: Ref<"current" | "new" | "archive">;
    tableFilters: TableFilters;
    // methods SYNC:
    resetWordsManagerData(): void;
    // methods ASYNC:
    loadDatasetCurrentWords(): Promise<void>;
    loadDatasetArchivedWords(): Promise<void>;
    loadCrucialWords(): Promise<void>;
}
