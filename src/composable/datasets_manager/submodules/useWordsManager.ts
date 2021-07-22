import UseWordsManager from "@/types/compositions/datasets_manager/useWordsManager";
import { ref, watch } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
// load utils
import _tableFilters from "@/composable/datasets_manager/__utils/words/tableFilters";
import _loadDatasetCurrentWords from "@/composable/datasets_manager/__utils/loaders/loadDatasetCurrentWords";
import _loadDatasetArchivedWords from "@/composable/datasets_manager/__utils/loaders/loadDatasetArchivedWords";
import _loadCrucialWords from "@/composable/datasets_manager/__utils/loaders/loadCrucialWords";
// use utils
export const tableFilters = _tableFilters;
export const loadDatasetCurrentWords = _loadDatasetCurrentWords;
export const loadDatasetArchivedWords = _loadDatasetArchivedWords;
export const loadCrucialWords = _loadCrucialWords;
// general properites
export const datasetCurrentWords = ref<Word[] | null>(null);
export const datasetArchivedWords = ref<ArchivedWord[] | null>(null);
export const datasetWordsProgress = ref<Record<string, "weak" | "strong" | "mastered" | null> | null>(null);
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);
export const newWord = ref<Word>({ expected: "", displayed: "" });
export const wordsToRestore = ref<ArchivedWord[]>([]);
// other properties
export const progressFilter = ref<"all" | "weak" | "strong" | "mastered">("all");
export const amountOfImportedWords = ref<number | false>(false);
export const currentWordsSection = ref<"current" | "new" | "archive">("current");
//
export const resetWordsManagerData = () => {
    datasetCurrentWords.value = null;
    datasetArchivedWords.value = null;
    datasetWordsProgress.value = null;
    wordsToDelete.value = [];
    wordsToRestore.value = [];
    newWords.value = [];
    newWord.value = { expected: "", displayed: "" };
    progressFilter.value = "all";
};
//
watch(
    wordsToDelete,
    (val) => {
        if (val.length === 0) {
            tableFilters.archived.onlySelected.value = false;
            tableFilters.archived.progress.value = "all";
            tableFilters.current.onlySelected.value = false;
            tableFilters.current.progress.value = "all";
        }
    },
    { deep: true }
);
//
export default {
    // Properties:
    datasetCurrentWords,
    datasetArchivedWords,
    datasetWordsProgress,
    tableFilters,
    currentWordsSection,
    progressFilter,
    wordsToDelete,
    wordsToRestore,
    newWords,
    newWord,
    amountOfImportedWords,
    // methods SYNC:
    resetWordsManagerData,
    // methods ASYNC:
    loadCrucialWords,
    loadDatasetArchivedWords,
    loadDatasetCurrentWords,
} as UseWordsManager;
