import { Ref, ComputedRef } from "vue";
import Word, { ArchivedWord, NewWord } from "@/types/Word";
import CurrentWord from "@/classes/CurrentWord";

interface SingleTableFilter<T extends CurrentWord | ArchivedWord> {
    onlySelected: Ref<boolean>;
    progress: Ref<"all" | "common" | "weak" | "strong" | "mastered">;
    type: Ref<"all" | "pair" | "image" | "irregular">;
    words: ComputedRef<T[]>;
    searchingPhrase: Ref<string>;
}
export interface TableFilters {
    current: SingleTableFilter<CurrentWord>;
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
    datasetCurrentWords: Ref<CurrentWord[] | null>;
    datasetArchivedWords: Ref<ArchivedWord[] | null>;
    datasetWordsProgress: Ref<DatasetWordsProgress | null>;
    datasetWordsLatestPoints: Ref<Record<string, { points: number; shift: "increased" | "decreased" | "equal" | "no_data" }>>;
    wordsToDelete: Ref<CurrentWord[]>;
    newWords: Ref<NewWord[]>;
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
