import { ref } from "vue";
import Word, { ArchivedWord } from "@/types/Word";
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
    wordsToDelete, //
    wordsToRestore,
    newWords,
    newWord,
    amountOfImportedWords,
    resetWordsManagerData,
};
