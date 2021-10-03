import path from "path";
import { progressLogsDirPath } from "@/composable/paths";
import fse from "fs-extra";
import { dataToPreview } from "@/composable/datasets_loaders/useDatasetsLoader";

export default async (): Promise<string[]> => {
    const result = [];
    for (const item of dataToPreview.value) {
        if (!(await fse.pathExists(path.join(progressLogsDirPath, item.fileName)))) {
            result.push(item.fileName);
        }
    }
    return result;
};
