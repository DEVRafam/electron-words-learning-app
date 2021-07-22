import { datasetToModify } from "@/composable/datasets_manager/useModifier";
import { datasetCurrentWords } from "@/composable/datasets_manager/submodules/useWordsManager";
import { loadSingleGameplayFile } from "@/composable/datasets_loaders/useDatasetsLoader";
//
export default async () => {
    if (datasetCurrentWords.value == null && datasetToModify.value) {
        datasetCurrentWords.value = (await loadSingleGameplayFile(datasetToModify.value.fileName)).words;
    }
};
