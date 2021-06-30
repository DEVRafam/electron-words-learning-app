import Word from "@/types/Word";
import { wordsToDelete } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";

export const isWordInDeletingList = (word: Word): boolean => {
    return !!wordsToDelete.value.find((target) => {
        return target.displayed === word.displayed && target.expected === word.expected;
    });
};
export const prepareWordForDeleting = (word: Word) => {
    if (isWordInDeletingList(word)) {
        const index = wordsToDelete.value.findIndex((target) => {
            return target.displayed === word.displayed && target.expected === word.expected;
        });
        wordsToDelete.value.splice(index, 1);
    } else wordsToDelete.value.push(word);
};
