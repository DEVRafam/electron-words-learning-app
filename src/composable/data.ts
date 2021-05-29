import fse from "fs-extra";
import Word from "@/types/Word";
import { dataPath } from "@/composable/__utils/paths";

export let originalData: Word[] = [];
export let data: Word[] = [];

export const removeFromDate = (element: Word) => {
    data = data.filter((target: Word) => {
        if (target.english === element.english && target.polish === element.polish) return false;
        return true;
    });
};

export const loadData = (otherPath: string | false = false) => {
    originalData = fse.readJSONSync(otherPath || dataPath);
    data = JSON.parse(JSON.stringify(originalData));
};
