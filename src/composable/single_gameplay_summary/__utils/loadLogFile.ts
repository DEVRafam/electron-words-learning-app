import { Ref } from "vue";
import fse from "fs-extra";
import path from "path";
import { progressLogsDirPath } from "@/composable/paths";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export const latestLogName = async (): Promise<string> => {
    const t = await fse.readdir(progressLogsDirPath);
    return t[t.length - 1];
};
export const loadLogFile = async (data: Ref<ProgressLogFile>, name: string | undefined): Promise<boolean> => {
    try {
        const fileName = name ? name + ".json" : await latestLogName();
        data.value = await fse.readJson(path.join(progressLogsDirPath, fileName));
        return true;
    } catch (_: unknown) {
        return false;
    }
};

export default { latestLogName, loadLogFile };
