import fse from "fs-extra";
import path from "path";
import { progressLogsDirPath } from "@/composable/paths";
import { gameplayDataFileName } from "@/composable/gameplay/main";
import { Answers, ProgressPoints } from "@/types/logger/Progress";
import ProgressLogFile from "@/types/logger/ProgressLogFile";
import { progressLog } from "@/composable/gameplay/logger";

type PointsRates = Record<keyof Answers, number>;

class ComputeProgressPoints {
    // define how fast points values will increase/decrease
    pointsRates: PointsRates = {
        valid: ((process.env.VUE_APP_POINTS_INCREASE_RATE || 1) as number) * 1,
        invalid: ((process.env.VUE_APP_POINTS_DECREASE_RATE || 2) as number) * -1,
        rescued: ((process.env.VUE_APP_POINTS_DECREASE_RATE || 2) as number) - ((process.env.VUE_APP_POINTS_AFTER_SUCCESSFUL_REDEMPTION || 1) as number),
    };

    answers: Answers = { invalid: [], valid: [], rescued: [] };
    uniquesEnglishWords: Set<string> = new Set();
    computedPoints: ProgressPoints = {};

    async loadAllLogs() {
        const filenames: string[] = await fse.readdir(path.join(progressLogsDirPath, gameplayDataFileName.value));
        for (const filename of filenames) {
            const log: ProgressLogFile = await fse.readJson(path.join(progressLogsDirPath, gameplayDataFileName.value, filename));
            //
            this.answers.invalid = this.answers.invalid.concat(log.answers.invalid);
            this.answers.valid = this.answers.valid.concat(log.answers.valid);
            this.answers.rescued = this.answers.rescued.concat(log.answers.rescued);
        }
        // include user's answers from current gameplay
        this.answers.invalid = this.answers.invalid.concat(progressLog.value.answers.invalid);
        this.answers.valid = this.answers.valid.concat(progressLog.value.answers.valid);
        this.answers.rescued = this.answers.rescued.concat(progressLog.value.answers.rescued);
    }

    findUniquesWords() {
        ["invalid", "valid", "rescued"].forEach((propname) => {
            this.answers[propname as keyof Answers].forEach((word) => {
                this.uniquesEnglishWords.add(word.english);
            });
        });
    }

    computePoints() {
        this.uniquesEnglishWords.forEach((word) => (this.computedPoints[word] = 0));
        //
        ["invalid", "valid", "rescued"].forEach((propname) => {
            this.answers[propname as keyof Answers].forEach((word) => {
                this.computedPoints[word.english] += this.pointsRates[propname as keyof PointsRates];
            });
        });
    }

    async main() {
        await this.loadAllLogs();
        this.findUniquesWords();
        this.computePoints();

        return this.computedPoints;
    }
}

export default () => new ComputeProgressPoints().main();
