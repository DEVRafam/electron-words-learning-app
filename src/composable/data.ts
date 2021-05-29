import fse from "fs-extra";
import Word from "@/types/Word";

export const PATH = (process.env.VUE_APP_DEFAULT_DATA_PATH as string) || "./src/data/main.json";
export const data: Word[] = fse.readJSONSync(PATH);
