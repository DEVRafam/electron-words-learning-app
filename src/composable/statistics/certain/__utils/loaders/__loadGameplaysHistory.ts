import { progressLogsDirPath } from "@/composable/paths";
import path from "path";
import fse from "fs-extra";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export default async (fileName: string): Promise<ProgressLogFile[]> => {
    try {
        const result = [] as ProgressLogFile[];
        const logsFilesNames: string[] = await fse.readdir(path.join(progressLogsDirPath, fileName));
        for (const singleLogFileName of logsFilesNames) {
            result.push(await fse.readJSON(path.join(progressLogsDirPath, fileName, singleLogFileName)));
        }
        return result;
    } catch (e) {
        return [];
    }
};
