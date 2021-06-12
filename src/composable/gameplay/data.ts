import fse from "fs-extra";
import Word from "@/types/Word";
import { dataDirPath } from "@/composable/paths";
import router from "@/router/index";
import path from "path";

import { GameplayDataFile } from "@/types/Gameplay";

export let originalData: Word[] = [];
export let data: Word[] = [];

export const removeFromDate = (element: Word) => {
    data = data.filter((target: Word) => {
        if (target.english === element.english && target.polish === element.polish) return false;
        return true;
    });
};

export const loadData = async (fileName: string) => {
    try {
        const readedFile: GameplayDataFile = await fse.readJson(path.join(dataDirPath, fileName + ".json"));
        originalData = readedFile.words;
        data = JSON.parse(JSON.stringify(originalData));
    } catch (e: unknown) {
        return router.push({ path: "/" });
    }
};
