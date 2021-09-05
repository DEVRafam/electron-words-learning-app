import { progressLogsDirPath } from "@/composable/paths";
import path from "path";
import fse from "fs-extra";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";

export default async (fileName: string) => {
    gamesHistory.value = [];

    const logsFilesNames: string[] = await fse.readdir(path.join(progressLogsDirPath, fileName));
    for (const singleLogFileName of logsFilesNames) {
        gamesHistory.value.push(await fse.readJSON(path.join(progressLogsDirPath, fileName, singleLogFileName)));
    }
};
