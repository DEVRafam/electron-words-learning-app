import { computed } from "vue";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";
import { wordsToDelete, newWords, wordsToRestore, datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { iconName, customIcon, fancyLetters, title, description, language } from "@/composable/datasets_manager/submodules/useGeneralInformations";

export default computed<boolean>(() => {
    const wordsToDeleteAreEmpty = wordsToDelete.value.length === 0;
    const wordsToRestoreAreEmpty = wordsToRestore.value.length === 0;
    const thereAreNoNewWords = newWords.value.length === 0;
    const iconHasNotBeenChanged = customIcon.value === null && iconName.value === datasetToModify.value?.icon;
    const fancyLettersHaveNotChanged = JSON.stringify(datasetToModify.value?.fancyLetters) === JSON.stringify(fancyLetters.value);
    const titleHasNotBeenChanged = title.value === datasetToModify.value?.title;
    const descriptionHasNotBeenChanged = description.value === datasetToModify.value?.description;
    const languageHasNotBeenChanged = language.value === datasetToModify.value?.pronunciationLanguage;
    const anyCurrentWordHasNotBeenModified = !datasetCurrentWords.value?.find((target) => target.hasBeenModified("displayed") || target.hasBeenModified("expected"));

    return (
        wordsToDeleteAreEmpty && //
        languageHasNotBeenChanged &&
        wordsToRestoreAreEmpty &&
        thereAreNoNewWords &&
        iconHasNotBeenChanged &&
        fancyLettersHaveNotChanged &&
        titleHasNotBeenChanged &&
        descriptionHasNotBeenChanged &&
        anyCurrentWordHasNotBeenModified
    );
});
