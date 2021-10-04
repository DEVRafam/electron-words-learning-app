import path from "path";
import { progressLogsDirPath } from "@/composable/paths";
import fse from "fs-extra";
import { dataToPreview, gameplaysWithBlockedStatistics } from "@/composable/datasets_loaders/useDatasetsLoader";

export default async (): Promise<void> => {
    gameplaysWithBlockedStatistics.value = [];

    for (const item of dataToPreview.value) {
        if (!(await fse.pathExists(path.join(progressLogsDirPath, item.fileName)))) {
            gameplaysWithBlockedStatistics.value.push(item.fileName);
        }
    }
};
