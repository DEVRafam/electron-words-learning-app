import { computed } from "vue";
import { wordsToDelete, newWords } from "@/composable/datasets_manager/useModifier-submodules/useWordsManager";
import { iconName, customIcon, fancyLetters, title, description } from "@/composable/datasets_manager/useModifier-submodules/useGeneralInformations";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";

export default computed<boolean>(() => {
    const wordsToDeleteAreEmpty = wordsToDelete.value.length === 0;
    const thereAreNoNewWords = newWords.value.length === 0;
    const iconHasNotChanged = customIcon.value === null && iconName.value === datasetToModify.value?.icon;
    const fancyLettersHaveNotChanged = JSON.stringify(datasetToModify.value?.fancyLetters) === JSON.stringify(fancyLetters.value);
    const titleHasNotChanged = title.value === datasetToModify.value?.title;
    const descriptionHasNotChanged = description.value === datasetToModify.value?.description;

    return (
        wordsToDeleteAreEmpty && //
        thereAreNoNewWords &&
        iconHasNotChanged &&
        fancyLettersHaveNotChanged &&
        titleHasNotChanged &&
        descriptionHasNotChanged
    );
});
