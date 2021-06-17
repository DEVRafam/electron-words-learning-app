import fse from "fs-extra";
import path from "path";
import { dataDirPath } from "@/composable/paths";
import { GameplayDataFile, GameplayDataFileForPreview } from "@/types/Gameplay";
import router from "@/router/index";
// get access to some crucials properties
import { latestLoadedDataFile } from "@/composable/words_manager/useWordsManager";

export const loadGameplayDataFilesNames = async (): Promise<string[]> => {
    return await (await fse.readdir(dataDirPath)).map((nameWithDotJson) => nameWithDotJson.split(".")[0]);
};

export const loadSingleGameplayFile = async (fileName: string): Promise<GameplayDataFile> => {
    try {
        const loadedData: GameplayDataFile = await fse.readJson(path.join(dataDirPath, fileName + ".json"));
        latestLoadedDataFile.value = loadedData;
        return loadedData;
    } catch (e: unknown) {
        router.push({ path: "/" });
        return {} as GameplayDataFile;
    }
};

const getModifiedDate = async (fileName: string): Promise<Date> => {
    return (await fse.stat(path.join(dataDirPath, fileName + ".json"))).mtime;
};

export const loadGameplayFilesForPreview = async () => {
    const result: GameplayDataFileForPreview[] = [];
    const names = await loadGameplayDataFilesNames();

    for (const fileName of names) {
        const loadedFile: GameplayDataFile = await loadSingleGameplayFile(fileName);
        const { words, ...dataForPreview } = loadedFile;
        result.push({
            fileName: fileName,
            wordsAmount: words.length,
            lastModified: await getModifiedDate(fileName),
            // title, description, icon, words:
            ...dataForPreview,
        });
    }
    return result;
};
