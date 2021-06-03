import fse from "fs-extra";
import path from "path";
import { progressLogsDirPath } from "@/composable/gameplay/__utils/paths";
import { Answers, ProgressPoints } from "@/types/logger/Progress";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

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

    loadAllLogs() {
        const filenames: string[] = fse.readdirSync(progressLogsDirPath);
        filenames.forEach((filename) => {
            const log: ProgressLogFile = fse.readJsonSync(path.join(progressLogsDirPath, filename));
            //
            this.answers.invalid = this.answers.invalid.concat(log.answers.invalid);
            this.answers.valid = this.answers.valid.concat(log.answers.valid);
            this.answers.rescued = this.answers.rescued.concat(log.answers.rescued);
        });
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

    main() {
        this.loadAllLogs();
        this.findUniquesWords();
        this.computePoints();

        return this.computedPoints;
    }
}

export default () => new ComputeProgressPoints().main();
