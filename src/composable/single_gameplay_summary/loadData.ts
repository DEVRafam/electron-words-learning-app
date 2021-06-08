import { ref } from "vue";
import fse from "fs-extra";
import path from "path";
import { progressLogsDirPath } from "@/composable/paths";

import ProgressLogFile from "@/types/logger/ProgressLogFile";

// properties
export const data = ref<ProgressLogFile>({} as ProgressLogFile);
export const dataFileName = ref<string>("");
// methods
export const latestLogName = async (): Promise<string> => {
    const t = await fse.readdir(progressLogsDirPath);
    return t[t.length - 1];
};
export const loadData = async (name: string | undefined): Promise<boolean> => {
    try {
        const fileName = name ? name + ".json" : await latestLogName();
        data.value = await fse.readJson(path.join(progressLogsDirPath, fileName));
        dataFileName.value = fileName;
        return true;
    } catch (_: unknown) {
        return false;
    }
};
//
export default { data, latestLogName, dataFileName, loadData };
