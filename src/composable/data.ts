import fse from "fs-extra";
import Word from "@/types/Word";

export let originalData: Word[] = [];
export let data: Word[] = [];

export const removeFromDate = (element: Word) => {
    data = data.filter((target: Word) => {
        if (target.english === element.english && target.polish === element.polish) return false;
        return true;
    });
};

export const loadData = (otherPath: string | false = false) => {
    const DEFAULT_DATA_PATH = (process.env.VUE_APP_DEFAULT_DATA_PATH as string) || "./src/data/main.json";

    originalData = fse.readJSONSync(otherPath || DEFAULT_DATA_PATH);
    data = JSON.parse(JSON.stringify(originalData));
};
