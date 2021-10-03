import fse from "fs-extra";
import path from "path";
import router from "@/router/index";
import { GameplayDataFile } from "@/types/Gameplay";
import { dataDirPath } from "@/composable/paths";

export default async (fileName: string): Promise<GameplayDataFile> => {
    try {
        return await fse.readJson(path.join(dataDirPath, fileName + ".json"));
    } catch (e: unknown) {
        router.push({ path: "/" });
        return {} as GameplayDataFile;
    }
};
