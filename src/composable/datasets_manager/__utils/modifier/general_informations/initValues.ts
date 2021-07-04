import { GameplayDataFileForPreview } from "@/types/Gameplay";
import { title, description, iconName, fancyLetters, displaySelectIconPanel } from "@/composable/datasets_manager/useModifier-submodules/useGeneralInformations";

export default (data: GameplayDataFileForPreview | null) => {
    displaySelectIconPanel.value = null;
    if (data) {
        title.value = data.title;
        description.value = data.description;
        iconName.value = data.icon;
        // fancyLetters TODO 🚀🚀
        fancyLetters.value = [];
    } else {
        title.value = "";
        description.value = "";
        iconName.value = "";
        fancyLetters.value = [];
    }
};
