import path from "path";
import fse from "fs-extra";
import { archivePath } from "@/composable/paths";
import { datasetToModify, isDatasetJustCreated } from "@/composable/datasets_manager/useModifier";
import { datasetArchivedWords } from "@/composable/datasets_manager/submodules/useWordsManager";

export default async () => {
    const thereAreNoArchivedWordsLoadedYet = datasetArchivedWords.value === null;
    const datasetHadBeenSelected = datasetToModify.value !== null;
    const datasetHasNotBeenJustCreated = !isDatasetJustCreated.value;

    if (thereAreNoArchivedWordsLoadedYet && datasetHadBeenSelected && datasetHasNotBeenJustCreated) {
        const p = path.join(archivePath, datasetToModify.value?.fileName + ".json");
        datasetArchivedWords.value = await fse.readJSON(p);
    }
};
