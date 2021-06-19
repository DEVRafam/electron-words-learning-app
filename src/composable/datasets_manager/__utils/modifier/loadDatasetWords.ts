import { datasetWords, datasetToModify } from "@/composable/datasets_manager/useModifier";
import { loadSingleGameplayFile } from "@/composable/datasets_manager/useLoader";
//
export default async () => {
    if (datasetWords.value == null && datasetToModify.value) {
        datasetWords.value = (await loadSingleGameplayFile(datasetToModify.value.fileName)).words;
    }
};
