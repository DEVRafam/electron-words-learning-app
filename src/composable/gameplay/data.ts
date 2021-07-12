import fse from "fs-extra";
import Word from "@/types/Word";
import { dataDirPath } from "@/composable/paths";
import router from "@/router/index";
import path from "path";
import useGameplay from "@/composable/gameplay/main";
import { GameplayDataFile } from "@/types/Gameplay";

export let originalData: Word[] = [];
export let data: Word[] = [];

export const removeFromDate = (element: Word) => data.remove(element);

export const loadData = async () => {
    try {
        const { gameplayDataFile } = useGameplay;
        const fileName = gameplayDataFile.value.fileName;
        const readedFile: GameplayDataFile = await fse.readJson(path.join(dataDirPath, fileName + ".json"));
        originalData = readedFile.words;
        data = JSON.parse(JSON.stringify(originalData));
    } catch (e: unknown) {
        return router.push({ path: "/" });
    }
};
