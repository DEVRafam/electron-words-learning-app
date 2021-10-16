import path from "path";
import fse from "fs-extra";
import { gameplayDataFile } from "@/composable/gameplay/useMain";
import { progressLog } from "@/composable/gameplay/useLogger";
import computeProgressPoints from "@/composable/gameplay/__utils/logger/saveLog/__utils/ComputeProgressPoints";
import determineCrucialWords from "@/composable/gameplay/__utils/logger/saveLog/__utils/DetermineCrucialWords";
import { progressLogsDirPath } from "@/composable/paths";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
//
import { ProgressPoints } from "@/types/logger/Progress";
import { CrucialWords } from "@/types/logger/CrucialWords";
//
class SaveProgress {
    protected logFileName: string;
    protected logFilePath: string;
    protected points: ProgressPoints = {};
    protected crucialWords: CrucialWords = {} as CrucialWords;

    public constructor() {
        this.logFileName = `${Date.now()}_log`;
        this.logFilePath = path.join(progressLogsDirPath, gameplayDataFile.value.fileName, this.logFileName + ".json");
    }

    protected computeAccuracy(): number {
        const { invalid, valid, rescued } = progressLog.value.answers;
        return ((valid.length + rescued.length * 0.75) / (invalid.length + valid.length + rescued.length)).toFixed(2) as unknown as number;
    }

    protected computeDuration(start: number): number {
        return (Date.now() - start) / 1000;
    }

    protected async saveJSONFile() {
        const { answers, start, number_of_draws } = progressLog.value;

        await fse.writeJson(this.logFilePath, {
            "accuracy[%]": this.computeAccuracy(),
            number_of_draws,
            answers,
            session: {
                date: start.UTC,
                "duration[s]": this.computeDuration(start.raw),
            },
            points: this.points,
            crucial_words: this.crucialWords,
        } as ProgressLogFile);
    }

    public async main(): Promise<string> {
        this.points = await computeProgressPoints();
        this.crucialWords = await determineCrucialWords(gameplayDataFile.value.fileName + ".json", this.points);
        await this.saveJSONFile();

        return this.logFileName;
    }
}
//
export default async (): Promise<string> => await new SaveProgress().main();
