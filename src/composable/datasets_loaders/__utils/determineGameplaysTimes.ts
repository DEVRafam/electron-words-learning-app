import fse from "fs-extra";
import path from "path";
import { dataDirPath } from "@/composable/paths";

interface DeterminedTimes {
    lastModified: string;
    createdAt: string;
    _rawTimes: {
        lastModified: number;
        createdAt: number;
    };
}

export default async (fileName: string): Promise<DeterminedTimes> => {
    const stats = await fse.stat(path.join(dataDirPath, fileName + ".json"));
    return {
        lastModified: new Date(stats.mtime).toLocaleString(),
        createdAt: new Date(stats.birthtime).toLocaleString(),
        _rawTimes: {
            lastModified: Number(stats.mtime),
            createdAt: Number(stats.birthtime),
        },
    };
};
