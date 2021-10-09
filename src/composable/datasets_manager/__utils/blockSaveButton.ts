import { computed } from "vue";
import { newWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { iconName, title, description, restrictions, customIcon } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { isDatasetJustCreated, nothingHasBeenChanged } from "@/composable/datasets_manager/useModifier";

export default computed<boolean>(() => {
    // NOTHING HAS BEEN CHANGED
    const thereAreNoNewWords = newWords.value.length === 0;
    // SOMETHING HAS BEEN INCORRECTLY CHANGED
    const titleDoesNotMatchRestrictions = title.value.length < restrictions.title.min || title.value.length > restrictions.title.max;
    const descriptionDoesNotMatchRestrictions = description.value.length < restrictions.description.min || description.value.length > restrictions.description.max;
    // NEW DATASETS ONLY
    const iconIsMissing = iconName.value === "__NONE__" && customIcon.value === null;

    return (
        // NOTHING HAS BEEN CHANGED
        nothingHasBeenChanged.value ||
        // SOMETHING HAS BEEN INCORRECTLY CHANGED
        titleDoesNotMatchRestrictions ||
        descriptionDoesNotMatchRestrictions ||
        // NEW DATASETS ONLY
        (isDatasetJustCreated.value &&
            (iconIsMissing || //
                thereAreNoNewWords))
    );
});
