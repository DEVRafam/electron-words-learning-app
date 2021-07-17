import fse from "fs-extra";
import { dataDirPath } from "@/composable/paths";

export default async (): Promise<string[]> => {
    return (await fse.readdir(dataDirPath)).map((nameWithDotJson) => nameWithDotJson.split(".")[0]);
};
