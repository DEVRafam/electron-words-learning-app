import { computed } from "vue";
import { wordsToDelete, newWords, wordsToRestore, datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { iconName, customIcon, fancyLetters, title, description, restrictions, language } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { datasetToModify, isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";

export default computed<boolean>(() => {
    // NOTHING HAS BEEN CHANGED
    const wordsToDeleteAreEmpty = wordsToDelete.value.length === 0;
    const wordsToRestoreAreEmpty = wordsToRestore.value.length === 0;
    const thereAreNoNewWords = newWords.value.length === 0;
    const iconHasNotBeenChanged = customIcon.value === null && iconName.value === datasetToModify.value?.icon;
    const fancyLettersHaveNotChanged = JSON.stringify(datasetToModify.value?.fancyLetters) === JSON.stringify(fancyLetters.value);
    const titleHasNotBeenChanged = title.value === datasetToModify.value?.title;
    const descriptionHasNotBeenChanged = description.value === datasetToModify.value?.description;
    const languageHasNotBeenChanged = language.value === datasetToModify.value?.pronunciationLanguage;
    // SOMETHING HAS BEEN INCORRECTLY CHANGED
    const titleDoesNotMatchRestrictions = title.value.length < restrictions.title.min || title.value.length > restrictions.title.max;
    const descriptionDoesNotMatchRestrictions = description.value.length < restrictions.description.min || description.value.length > restrictions.description.max;
    // SOMETHING HAS BEEN CHANGED
    const anyCurrentWordHasNotBeenModified = !datasetCurrentWords.value?.find((target) => target.hasBeenModified("displayed") || target.hasBeenModified("expected"));
    // NEW DATASETS ONLY
    const iconIsMissing = iconName.value === "__NONE__";

    return (
        // NOTHING HAS BEEN CHANGED
        (wordsToDeleteAreEmpty && //
            languageHasNotBeenChanged &&
            wordsToRestoreAreEmpty &&
            thereAreNoNewWords &&
            iconHasNotBeenChanged &&
            fancyLettersHaveNotChanged &&
            titleHasNotBeenChanged &&
            descriptionHasNotBeenChanged &&
            anyCurrentWordHasNotBeenModified) ||
        // SOMETHING HAS BEEN INCORRECTLY CHANGED
        titleDoesNotMatchRestrictions ||
        descriptionDoesNotMatchRestrictions ||
        // NEW DATASETS ONLY
        (isDatasetJustCreated.value &&
            (iconIsMissing || //
                thereAreNoNewWords))
    );
});
