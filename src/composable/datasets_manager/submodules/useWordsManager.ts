import { ref, watch } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
// load utils
import _filtredCurrentWords from "@/composable/datasets_manager/__utils/words/filteredCurrentWords";
import _tableFilters from "@/composable/datasets_manager/__utils/words/tableFilters";
// use utils
export const filtredCurrentWords = _filtredCurrentWords;
export const tableFilters = _tableFilters;
// general properites
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
    wordsToDelete.value = [];
    wordsToRestore.value = [];
    newWords.value = [];
    newWord.value = { expected: "", displayed: "" };
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
    tableFilters, //
    currentWordsSection,
    filtredCurrentWords,
    progressFilter,
    wordsToDelete,
    wordsToRestore,
    newWords,
    newWord,
    amountOfImportedWords,
    resetWordsManagerData,
};
