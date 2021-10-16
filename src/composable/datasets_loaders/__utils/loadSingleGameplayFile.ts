import fse from "fs-extra";
import path from "path";
import router from "@/router/index";
import { DatasetFile } from "@/types/Dataset";
import { dataDirPath } from "@/composable/paths";

export default async (fileName: string): Promise<DatasetFile> => {
    try {
        return await fse.readJson(path.join(dataDirPath, fileName + ".json"));
    } catch (e: unknown) {
        router.push({ path: "/" });
        return {} as DatasetFile;
    }
};
