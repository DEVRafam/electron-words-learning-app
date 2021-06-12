import path from "path";
import fse from "fs-extra";
import { gameplayDataFileName } from "@/composable/gameplay/main";
import { progressLogsDirPath, crucialWordsDirPath } from "@/composable/paths";

export const ensureProgressLogDir = async () => {
    await fse.ensureDir(path.join(progressLogsDirPath, gameplayDataFileName.value));
};
export const ensureCrucialWordFiles = async () => {
    const p = path.join(crucialWordsDirPath, gameplayDataFileName.value + ".json");
    await fse.ensureFile(p);
    try {
        await fse.readJson(p);
    } catch (e: unknown) {
        await fse.writeJson(p, {
            strong: [],
            mastered: [],
            weak: [],
        });
    }
};

export default async () => {
    await ensureProgressLogDir();
    await ensureCrucialWordFiles();
};
