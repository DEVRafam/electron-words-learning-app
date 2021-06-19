import { computed } from "vue";
import { wordsToDelete, newWords } from "@/composable/datasets_manager/useModifier";

export default computed<boolean>(() => {
    return !wordsToDelete.value.length && !newWords.value.length;
});
