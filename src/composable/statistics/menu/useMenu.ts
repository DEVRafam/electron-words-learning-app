import { ref } from "vue";
import { dataDirPath } from "@/composable/paths";
import fse from "fs-extra";
// Properties:
export const datasetsFilesName = ref<string[]>([]);
// Methods ASYNC:
export const loadAllDatasetsNames = async () => {
    const rawFilesNames = await fse.readdir(dataDirPath);
    // find only .json files
    const result = rawFilesNames.filter((target) => {
        return target.slice(-5) === ".json";
    });
    // remove ".json" extension to expose only the filename
    datasetsFilesName.value = result.map((target) => {
        return target.split(".json")[0];
    });
};

export default {
    // Properties:
    datasetsFilesName,
    // Methods SYNC:
    //
    // Methods ASYNC:
    loadAllDatasetsNames,
};
