import fse from "fs-extra";
import path from "path";
import router from "@/router/index";
import { progressLogsDirPath } from "@/composable/paths";
import { data } from "@/composable/single_gameplay_summary/useSummary";

export const latestLogName = async (): Promise<string> => {
    const t = await fse.readdir(progressLogsDirPath);
    return t[t.length - 1];
};
export const loadLogFile = async () => {
    try {
        const { gameplayDataFileName, logFileName } = router.currentRoute.value.params;
        data.value = await fse.readJson(path.join(progressLogsDirPath, gameplayDataFileName as string, logFileName + ".json"));
    } catch (_: unknown) {
        return router.push({ path: "/" });
    }
};

export default { latestLogName, loadLogFile };
