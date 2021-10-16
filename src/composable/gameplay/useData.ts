import { ref } from "vue";
import fse from "fs-extra";
import path from "path";
import router from "@/router/index";

import Word from "@/types/Word";
import { DatasetFile } from "@/types/Dataset";
import UseData from "@/types/compositions/gameplay/_useData";

import { dataDirPath } from "@/composable/paths";
import useGameplay from "@/composable/gameplay/useMain";

export const originalData = ref<Word[]>([]);
export const data = ref<Word[]>([]);

export const loadData = async () => {
    try {
        const { gameplayDataFile } = useGameplay;
        const fileName = gameplayDataFile.value.fileName;
        const readedFile: DatasetFile = await fse.readJson(path.join(dataDirPath, fileName + ".json"));
        originalData.value = readedFile.words;
        data.value = JSON.parse(JSON.stringify(originalData.value));
    } catch (e: unknown) {
        return router.push({ path: "/" });
    }
};

export default {
    // Properties
    originalData,
    data,
    // methods SYNC:
    // methods ASYNC:
    loadData,
} as UseData;
