import { DatasetFileForPreview } from "@/types/Dataset";
import { title, description, iconName, fancyLetters, language, displaySelectIconPanel } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { latestImportedWords } from "@/composable/datasets_manager/__utils/importing/importNewWords";

export default (data: DatasetFileForPreview | null) => {
    displaySelectIconPanel.value = null;
    latestImportedWords.value = [];

    if (data) {
        title.value = data.title;
        description.value = data.description;
        iconName.value = data.icon;
        language.value = data.pronunciationLanguage;
        fancyLetters.value = JSON.parse(JSON.stringify(data.fancyLetters));
    } else {
        title.value = "";
        description.value = "";
        iconName.value = "";
        language.value = false;
        fancyLetters.value = [];
    }
};
