import fse from "fs-extra";
import path from "path";
import { dataDirPath } from "@/composable/paths";

export default async (fileName: string): Promise<string> => {
    const lastModifiedRaw = (await fse.stat(path.join(dataDirPath, fileName + ".json"))).mtime;
    return new Date(lastModifiedRaw).toLocaleString();
};
