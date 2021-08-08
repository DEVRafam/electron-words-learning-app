import { Ref, ComputedRef } from "vue";
// types
import { GameplayDataFileForPreview } from "@/types/Gameplay";
// submodules
import UseWordsManager from "@/types/compositions/datasets_manager/_useWordsManager";
import UseGeneralInformations from "@/types/compositions/datasets_manager/_useGeneralInformations";
import UseImporting from "@/types/compositions/datasets_manager/_useImporting";
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
    biggerWindow: Ref<boolean>;
    blockSaveButton: ComputedRef<boolean>;
    isDatasetJustCreated: ComputedRef<boolean>;
    // methods SYNC:
    selectDataset(val: GameplayDataFileForPreview | null): void;
    prepareNewDataset(): void;
    // methods ASYNC:
    saveChanges(): Promise<void>;
}
