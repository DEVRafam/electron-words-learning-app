import { GameplayDataFileForPreview } from "@/types/Gameplay";
import { title, description, iconName, fancyLetters, displaySelectIconPanel } from "@/composable/datasets_manager/submodules/useGeneralInformations";
import { latestImportedWords } from "@/composable/datasets_manager/__utils/importing/importNewWords";

export default (data: GameplayDataFileForPreview | null) => {
    displaySelectIconPanel.value = null;
    latestImportedWords.value = [];

    if (data) {
        title.value = data.title;
        description.value = data.description;
        iconName.value = data.icon;
        fancyLetters.value = JSON.parse(JSON.stringify(data.fancyLetters));
    } else {
        title.value = "";
        description.value = "";
        iconName.value = "";
        fancyLetters.value = [];
    }
};
