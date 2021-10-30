import path from "path";
import fse from "fs-extra";
import { progressLogsDirPath } from "@/composable/paths";
import { datasetWordsLatestPoints } from "@/composable/datasets_manager/submodules/useWordsManager";

export default async (filename: string) => {
    const logs = (await fse.readdir(path.join(progressLogsDirPath, filename))).reverse();
    if (logs.length === 0) return;

    const _path = (logFileName: string) => path.join(progressLogsDirPath, filename, logFileName);
    const latest = (await fse.readJSON(_path(logs[0]))).points;
    if (logs.length === 1) {
        return Object.keys(latest).forEach((key) => {
            datasetWordsLatestPoints.value[key] = {
                points: latest[key],
                shift: "no_data",
            };
        });
    }

    const previousOne = (await fse.readJSON(_path(logs[Math.min(logs.length - 1, 2)]))).points;
    Object.keys(latest).forEach((key) => {
        const a = latest[key];

        datasetWordsLatestPoints.value[key] = {
            points: a,
            shift: ((): "increased" | "decreased" | "equal" => {
                const b = previousOne[key];
                if (a === b) return "equal";
                if (a > b) return "increased";
                return "decreased";
            })(),
        };
    });
};
