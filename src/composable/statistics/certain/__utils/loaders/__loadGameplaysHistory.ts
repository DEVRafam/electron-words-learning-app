import { progressLogsDirPath } from "@/composable/paths";
import path from "path";
import fse from "fs-extra";
import { gamesHistory } from "@/composable/statistics/certain/useCertain";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export default async (fileName: string) => {
    gamesHistory.value = [];

    const logsFilesNames: string[] = await fse.readdir(path.join(progressLogsDirPath, fileName));
    for (const singleLogFileName of logsFilesNames) {
        gamesHistory.value.push(await fse.readJSON(path.join(progressLogsDirPath, fileName, singleLogFileName)));
    }
    const getDate = (target: ProgressLogFile): number => Date.parse(target.session.date);
    // gamesHistory.value = gamesHistory.value.sort((a, b) => getDate(b) - getDate(a));
};
