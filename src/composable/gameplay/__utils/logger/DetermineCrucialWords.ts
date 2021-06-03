import fse from "fs-extra";
import path from "path";
import Word from "@/types/Word";
import { ProgressPoints } from "@/types/logger/Progress";
import { CrucialWordsDeterminationResult, CrucialWords, NewCrucialWords, RemovedCrucialWords, CrucialWordsFilesPaths } from "@/types/logger/CrucialWords";
import { originalData } from "@/composable/gameplay/data";
import { crucialWordsDirPath } from "@/composable/paths";

class DetermineCrucialWords {
    paths: CrucialWordsFilesPaths = {
        weakWords: path.join(crucialWordsDirPath, "weak.json"),
        strongWords: path.join(crucialWordsDirPath, "strong.json"),
        masteredWords: path.join(crucialWordsDirPath, "mastered.json"),
    };
    crucialLevelsBorders = {
        strong: (process.env.VUE_APP_POINTS_TO_DEFINE_STRONG || 3) as number,
        weak: (process.env.VUE_APP_POINTS_TO_DEFINE_WEAK || -3) as number,
        mastered: (process.env.VUE_APP_POINTS_TO_DEFINE_MASTERED || 5) as number,
    };
    currentDeterminedCrucialWords: CrucialWordsDeterminationResult<string> = {
        weakWords: [],
        strongWords: [],
        masteredWords: [],
    };
    alreadySavedCrucialWords: CrucialWordsDeterminationResult<Word> = {
        weakWords: fse.readJsonSync(this.paths.weakWords),
        strongWords: fse.readJsonSync(this.paths.strongWords),
        masteredWords: fse.readJsonSync(this.paths.masteredWords),
    };

    constructor(private points: ProgressPoints) {}

    transformEnglishKeyToWordType(english: string): Word | undefined {
        return originalData.find((target) => target.english === english);
    }

    determineAllCrucialWords() {
        const { points, crucialLevelsBorders, currentDeterminedCrucialWords } = this;
        const { masteredWords, weakWords, strongWords } = currentDeterminedCrucialWords;

        Object.keys(points).forEach((english) => {
            const val = points[english];
            //
            if (val >= crucialLevelsBorders.mastered) masteredWords.push(english);
            else if (val >= crucialLevelsBorders.strong) strongWords.push(english);
            else if (val <= crucialLevelsBorders.weak) weakWords.push(english);
        });
    }

    determineWhichCrucialWordIsNew(): NewCrucialWords {
        const newCrucialWords = JSON.parse(JSON.stringify(this.currentDeterminedCrucialWords));

        ["weakWords", "strongWords", "masteredWords"].forEach((propname) => {
            newCrucialWords[propname].filter((target: string) => {
                return !this.alreadySavedCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].find((word: Word) => target === word.english);
            });
            // translate <string> to <Word>
            newCrucialWords[propname] = newCrucialWords[propname].map((target: string) => this.transformEnglishKeyToWordType(target));
        });
        return newCrucialWords;
    }

    determineWhichCrucialWordWasRemoved(): RemovedCrucialWords {
        const removedCrucialWords: CrucialWordsDeterminationResult<Word> = JSON.parse(JSON.stringify(this.alreadySavedCrucialWords));
        //
        ["weakWords", "strongWords"].forEach((propname) => {
            removedCrucialWords[propname as keyof CrucialWordsDeterminationResult<Word>].filter((target: Word) => {
                return !this.currentDeterminedCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].includes(target.english);
            });
        });
        return removedCrucialWords;
    }

    saveChanges() {
        const translateKeysToWords = (list: string[]): Word[] => {
            return list.map((word: string) => this.transformEnglishKeyToWordType(word)) as Word[];
        };
        fse.writeJsonSync(this.paths.weakWords, translateKeysToWords(this.currentDeterminedCrucialWords.weakWords));
        fse.writeJsonSync(this.paths.strongWords, translateKeysToWords(this.currentDeterminedCrucialWords.strongWords));
        fse.writeJsonSync(this.paths.masteredWords, translateKeysToWords(this.currentDeterminedCrucialWords.masteredWords));
    }

    main(): CrucialWords {
        this.determineAllCrucialWords();
        const newCrucialWords: NewCrucialWords = this.determineWhichCrucialWordIsNew();
        const removedCrucialWords: RemovedCrucialWords = this.determineWhichCrucialWordWasRemoved();
        this.saveChanges();
        // data for logging
        return {
            words_made_mastered: newCrucialWords.masteredWords,
            words_made_strong: newCrucialWords.strongWords,
            words_made_weak: newCrucialWords.weakWords,
            words_removed_from_strong: removedCrucialWords.strongWords,
            words_removed_from_weak: removedCrucialWords.weakWords,
        };
    }
}

export default (points: ProgressPoints) => new DetermineCrucialWords(points).main();
