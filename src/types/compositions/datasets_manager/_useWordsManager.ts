import { Ref, ComputedRef } from "vue";
import Word, { ArchivedWord, NewWord } from "@/types/Word";

interface SingleTableFilter<T extends Word | ArchivedWord> {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "common" | "weak" | "strong" | "mastered">;
    words: ComputedRef<T[]>;
    searchingPhrase: Ref<string>;
}
export interface TableFilters {
    current: SingleTableFilter<Word>;
    archived: SingleTableFilter<ArchivedWord>;
    news: {
        possibleOrigins: ComputedRef<string[]>;
        origin: Ref<"Inscribed" | string>;
        words: ComputedRef<NewWord[]>;
    };
}
export type DatasetWordsProgress = Record<string, "weak" | "strong" | "mastered" | null>;

export default interface UseWordsManager {
    // Properties:
    datasetCurrentWords: Ref<Word[] | null>;
    datasetArchivedWords: Ref<ArchivedWord[] | null>;
    datasetWordsProgress: Ref<DatasetWordsProgress | null>;
    wordsToDelete: Ref<Word[]>;
    newWords: Ref<NewWord[]>;
    newWord: Ref<Word>;
    wordsToRestore: Ref<ArchivedWord[]>;
    progressFilter: Ref<"all" | "weak" | "strong" | "mastered">;
    amountOfImportedWords: Ref<number | false>;
    currentWordsSection: Ref<"current" | "new" | "archived">;
    tableFilters: TableFilters;
    // methods SYNC:
    resetWordsManagerData(isJustCreated: boolean): void;
    // methods ASYNC:
    loadDatasetCurrentWords(): Promise<void>;
    loadDatasetArchivedWords(): Promise<void>;
    loadCrucialWords(): Promise<void>;
}
