import { Ref, ComputedRef } from "vue";
// types
import { GameplayDataFileForPreview } from "@/types/Gameplay";
// submodules
import UseWordsManager from "@/types/compositions/datasets_manager/useWordsManager";
import UseGeneralInformations from "@/types/compositions/datasets_manager/useGeneralInformations";
import UseImporting from "@/types/compositions/datasets_manager/useImporting";
//
export default interface UseModifier {
    // Submodules:
    useGeneralInformations: UseGeneralInformations;
    useWordsManager: UseWordsManager;
    useImporting: UseImporting;
    // Properties:
    datasetToModify: Ref<GameplayDataFileForPreview | null>;
    isDatasetSelected: ComputedRef<boolean>;
    previewModifySection: Ref<boolean>;
    blockSaveButton: ComputedRef<boolean>;
    // methods SYNC:
    selectDataset(val: GameplayDataFileForPreview | null): void;
    // methods ASYNC:
    saveChanges(): Promise<void>;
}
