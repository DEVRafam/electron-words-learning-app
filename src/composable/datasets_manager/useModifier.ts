import { ref, computed } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import Word from "@/types/Word";

export const datasetToModify = ref<GameplayDataFileForPreview | null>(null);
export const isDatasetSelected = computed<boolean>(() => datasetToModify.value !== null);
export const previewModifySection = ref<boolean>(false);
export const deletedWords = ref<Word[]>([]);
export const newWords = ref<Word[]>([]);

export const selectDataset = (val: GameplayDataFileForPreview | null) => {
    previewModifySection.value = !!val;
    datasetToModify.value = val;
};

export default { datasetToModify, isDatasetSelected, selectDataset, previewModifySection };
