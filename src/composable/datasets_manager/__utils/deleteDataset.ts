import path from "path";
import fse from "fs-extra";
import { datasetToModify } from "@/composable/datasets_manager/useModifier";
import { progressLogsDirPath, crucialWordsDirPath, dataDirPath, archivePath } from "@/composable/paths";

export default async (): Promise<"positive" | "negative"> => {
    if (datasetToModify.value) {
        try {
            const { fileName } = datasetToModify.value;
            const JSONFileName = fileName + ".json";
            console.log(fileName);
            //
            await fse.remove(path.join(dataDirPath, JSONFileName));
            await fse.remove(path.join(archivePath, JSONFileName));
            await fse.remove(path.join(crucialWordsDirPath, JSONFileName));
            await fse.remove(path.join(progressLogsDirPath, fileName));
            //
            return "positive";
        } catch (e: any) {
            return "negative";
        }
    }
    return "negative";
};
