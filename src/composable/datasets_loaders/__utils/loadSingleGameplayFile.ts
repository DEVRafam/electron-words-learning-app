import fse from "fs-extra";
import path from "path";
import router from "@/router/index";
import { GameplayDataFile } from "@/types/Gameplay";
import { dataDirPath } from "@/composable/paths";

import { latestLoadedDataFile } from "@/composable/datasets_loaders/useDatasetsLoader";

export default async (fileName: string): Promise<GameplayDataFile> => {
    try {
        const loadedData: GameplayDataFile = await fse.readJson(path.join(dataDirPath, fileName + ".json"));
        latestLoadedDataFile.value = loadedData;

        return loadedData;
    } catch (e: unknown) {
        router.push({ path: "/" });
        return {} as GameplayDataFile;
    }
};
