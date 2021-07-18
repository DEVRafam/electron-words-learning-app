import { ref, watch } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
// load utils
import _filtredCurrentWords from "@/composable/datasets_manager/__utils/words/filteredCurrentWords";
// use utils
export const filtredCurrentWords = _filtredCurrentWords;
// general properites
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);
export const newWord = ref<Word>({ expected: "", displayed: "" });
export const wordsToRestore = ref<ArchivedWord[]>([]);
// other properties
export const onlySelected = ref<boolean>(false);
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
        if (val.length === 0) onlySelected.value = false;
    },
    { deep: true }
);
//
export default {
    onlySelected, //
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
