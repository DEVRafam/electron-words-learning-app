import { ref } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
// load utils
import {
    isWordInDeletingList as _isWordInDeletingList,
    prepareWordForDeleting as _prepareWordForDeleting, //
} from "@/composable/datasets_manager/__utils/modifier/words/deleteActions";
import {
    isWordInRestoringList as _isWordInRestoringList,
    prepareWordForRestoring as _prepareWordForRestoring, //
} from "@/composable/datasets_manager/__utils/modifier/words/restoreActions";
// use utils
export const isWordInDeletingList = _isWordInDeletingList;
export const prepareWordForDeleting = _prepareWordForDeleting;
export const isWordInRestoringList = _isWordInRestoringList;
export const prepareWordForRestoring = _prepareWordForRestoring;
// general properites
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);
export const newWord = ref<Word>({ expected: "", displayed: "" });
export const wordsToRestore = ref<ArchivedWord[]>([]);
// other properties
export const amountOfImportedWords = ref<number | false>(false);
//
export const resetWordsManagerData = () => {
    wordsToDelete.value = [];
    wordsToRestore.value = [];
    newWords.value = [];
    newWord.value = { expected: "", displayed: "" };
};

export default {
    isWordInDeletingList, //
    isWordInRestoringList,
    prepareWordForRestoring,
    prepareWordForDeleting,
    wordsToDelete,
    wordsToRestore,
    newWords,
    newWord,
    amountOfImportedWords,
    resetWordsManagerData,
};
