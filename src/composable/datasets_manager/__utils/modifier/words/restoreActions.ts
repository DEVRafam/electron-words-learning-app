import { ArchivedWord } from "@/types/Word";
import { wordsToRestore } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";

export const isWordInRestoringList = (word: ArchivedWord): boolean => {
    return !!wordsToRestore.value.find((target) => {
        return target.displayed === word.displayed && target.expected === word.expected;
    });
};
export const prepareWordForRestoring = (word: ArchivedWord) => {
    if (isWordInRestoringList(word)) {
        const index = wordsToRestore.value.findIndex((target) => {
            return target.displayed === word.displayed && target.expected === word.expected;
        });
        wordsToRestore.value.splice(index, 1);
    } else wordsToRestore.value.push(word);
};
