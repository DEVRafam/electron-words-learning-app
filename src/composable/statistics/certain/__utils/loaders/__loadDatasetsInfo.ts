import path from "path";
import fse from "fs-extra";
import { dataDirPath } from "@/composable/paths";
import { DatasetFile } from "@/types/Dataset";

export default async (fileName: string): Promise<DatasetFile> => {
    return await fse.readJSON(path.join(dataDirPath, fileName + ".json"));
};
