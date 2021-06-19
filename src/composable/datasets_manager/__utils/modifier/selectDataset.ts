import { GameplayDataFileForPreview } from "@/types/Gameplay";
import { previewModifySection, datasetToModify } from "@/composable/datasets_manager/useModifier";

export default (val: GameplayDataFileForPreview | null) => {
    previewModifySection.value = !!val;
    datasetToModify.value = val;
};
