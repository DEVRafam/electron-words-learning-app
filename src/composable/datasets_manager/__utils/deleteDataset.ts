import path from "path";
import fse from "fs-extra";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";
import { progressLogsDirPath, crucialWordsDirPath, dataDirPath, archivePath, wordsTypeImagePath } from "@/composable/paths";

export default async (): Promise<"positive" | "negative"> => {
    if (datasetToModify.value) {
        try {
            const { fileName } = datasetToModify.value;
            const JSONFileName = fileName + ".json";
            //
            await fse.remove(path.join(dataDirPath, JSONFileName));
            await fse.remove(path.join(archivePath, JSONFileName));
            await fse.remove(path.join(crucialWordsDirPath, JSONFileName));
            await fse.remove(path.join(progressLogsDirPath, fileName));
            await fse.remove(path.join(wordsTypeImagePath, fileName));
            //
            return "positive";
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            return "negative";
        }
    }
    return "negative";
};
