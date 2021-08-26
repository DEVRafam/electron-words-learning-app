import { dataDirPath } from "@/composable/paths";
import path from "path";
import fse from "fs-extra";
import { dataset } from "@/composable/statistics/certain/useCertain";

export default async (fileName: string) => {
    dataset.value = await fse.readJSON(path.join(dataDirPath, fileName + ".json"));
};
