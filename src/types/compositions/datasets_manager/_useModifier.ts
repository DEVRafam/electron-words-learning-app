import { Ref, ComputedRef } from "vue";
// types
import { DatasetFileForPreview } from "@/types/Dataset";
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
    datasetToModify: Ref<DatasetFileForPreview | null>;
    extendCurrentWordsSection: Ref<boolean>;
    loadExtendedContent: Ref<boolean>;
    isDeletingModalOpen: Ref<boolean>;
    displayExitModal: Ref<"menu" | "stats" | false>;
    blockSaveButton: ComputedRef<boolean>;
    nothingHasBeenChanged: ComputedRef<boolean>;
    isDatasetJustCreated: ComputedRef<boolean>;
    // methods SYNC:
    prepareNewDataset(): void;
    // methods ASYNC:
    saveChanges(): Promise<boolean>;
    loadDatasetsInfo(): Promise<void>;
    deleteDataset(): Promise<"positive" | "negative">;
}
