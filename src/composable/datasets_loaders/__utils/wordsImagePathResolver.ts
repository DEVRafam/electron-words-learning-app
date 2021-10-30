import path from "path";

import Word from "@/types/Word";
import { wordsTypeImagePath } from "@/composable/paths";

export default (datasetsName: string, word: Word): string => {
    if (process.env.NODE_ENV === "production") {
        return `file:://${path.resolve(path.join(wordsTypeImagePath, datasetsName, word.displayed)).replace(/\\/g, "/")}`;
    } else return `/images/datasets/${datasetsName}/${word.displayed}`;
};
