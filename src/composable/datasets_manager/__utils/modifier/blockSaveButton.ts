import { computed } from "vue";
import { wordsToDelete, newWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";

export default computed<boolean>(() => {
    return !wordsToDelete.value.length && !newWords.value.length;
});
