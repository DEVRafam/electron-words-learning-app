import { ref } from "vue";
import Word from "@/types/Word";
// load utils
import _loadDatasetWords from "@/composable/datasets_manager/__utils/modifier/loadDatasetWords";
import {
    isWordInDeletingList as _isWordInDeletingList,
    prepareWordForDeleting as _prepareWordForDeleting, //
} from "@/composable/datasets_manager/__utils/modifier/words/deleteActions";
// use utils
export const loadDatasetWords = _loadDatasetWords;
export const isWordInDeletingList = _isWordInDeletingList;
export const prepareWordForDeleting = _prepareWordForDeleting;
// general properites
export const wordsToDelete = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);
export const newWord = ref<Word>({ expected: "", displayed: "" });
// other properties
export const amountOfImportedWords = ref<number | false>(false);
//
export const resetWordsManagerData = () => {
    wordsToDelete.value = [];
    newWords.value = [];
    newWord.value = { expected: "", displayed: "" };
};

export default { loadDatasetWords, isWordInDeletingList, prepareWordForDeleting, wordsToDelete, newWords, newWord, amountOfImportedWords, resetWordsManagerData };
