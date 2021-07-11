import { datasetCurrentWords, datasetToModify } from "@/composable/datasets_manager/useModifier";
import { loadSingleGameplayFile } from "@/composable/datasets_manager/useLoader";
//
export default async () => {
    if (datasetCurrentWords.value == null && datasetToModify.value) {
        datasetCurrentWords.value = (await loadSingleGameplayFile(datasetToModify.value.fileName)).words;
    }
};
