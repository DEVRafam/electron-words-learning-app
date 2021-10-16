import fse from "fs-extra";
import path from "path";
import Word, { ArchivedWord } from "@/types/Word";
import { ProgressPoints } from "@/types/logger/Progress";
import { CrucialWordsDeterminationResult, CrucialWords, NewCrucialWords, RemovedCrucialWords, CrucialWordsFilesPaths } from "@/types/logger/CrucialWords";
import { originalData } from "@/composable/gameplay/useData";
import { crucialWordsDirPath } from "@/composable/paths";

class DetermineCrucialWords {
    protected gameplayDataFilePath: string;
    protected readonly paths: CrucialWordsFilesPaths = {
        weakWords: path.join(crucialWordsDirPath, "weak.json"),
        strongWords: path.join(crucialWordsDirPath, "strong.json"),
        masteredWords: path.join(crucialWordsDirPath, "mastered.json"),
    };
    protected crucialLevelsBorders = {
        strong: (process.env.VUE_APP_POINTS_TO_DEFINE_STRONG || 3) as number,
        weak: (process.env.VUE_APP_POINTS_TO_DEFINE_WEAK || -3) as number,
        mastered: (process.env.VUE_APP_POINTS_TO_DEFINE_MASTERED || 5) as number,
    };
    protected currentDeterminedCrucialWords: CrucialWordsDeterminationResult<string> = {
        weakWords: [],
        strongWords: [],
        masteredWords: [],
    };
    protected alreadySavedCrucialWords: CrucialWordsDeterminationResult<Word> = {
        weakWords: [],
        strongWords: [],
        masteredWords: [],
    };

    constructor(filename: string, private points: ProgressPoints) {
        this.gameplayDataFilePath = path.join(crucialWordsDirPath, filename);
    }

    protected transformEnglishKeyToWordType(english: string): Word | undefined {
        return originalData.value.find((target) => target.expected === english);
    }

    protected determineAllCrucialWords() {
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

    protected determineWhichCrucialWordIsNew(): NewCrucialWords {
        const newCrucialWords: CrucialWordsDeterminationResult<string | Word> = { weakWords: [], strongWords: [], masteredWords: [] };
        ["weakWords", "strongWords", "masteredWords"].forEach((propname) => {
            this.currentDeterminedCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].filter((target: string) => {
                if (!this.alreadySavedCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].find((word: Word) => target === word.expected)) {
                    newCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].push(target);
                }
            });
            // eslint-disable-next-line
            newCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>] = (newCrucialWords as any)[propname].map((target: string) => this.transformEnglishKeyToWordType(target));
        });
        return newCrucialWords as NewCrucialWords;
    }

    protected determineWhichCrucialWordWasRemoved(): RemovedCrucialWords {
        const removedCrucialWords: RemovedCrucialWords = { weakWords: [], strongWords: [] };
        ["weakWords", "strongWords"].forEach((propname) => {
            this.alreadySavedCrucialWords[propname as keyof CrucialWordsDeterminationResult<Word>].forEach((target: Word) => {
                if (!this.currentDeterminedCrucialWords[propname as keyof CrucialWordsDeterminationResult<string>].find((el) => el === target.expected)) {
                    removedCrucialWords[propname as keyof RemovedCrucialWords].push(target);
                }
            });
        });
        return removedCrucialWords as RemovedCrucialWords;
    }

    protected async saveChanges() {
        const translateKeysToWords = (list: string[]): Word[] => {
            return list.map((word: string) => this.transformEnglishKeyToWordType(word)) as Word[];
        };
        await fse.writeJson(this.gameplayDataFilePath, {
            strong: translateKeysToWords(this.currentDeterminedCrucialWords.strongWords),
            mastered: translateKeysToWords(this.currentDeterminedCrucialWords.masteredWords),
            weak: translateKeysToWords(this.currentDeterminedCrucialWords.weakWords),
        });
    }

    protected async loadAlreadySavedCrucialWords() {
        const loaded = await fse.readJson(this.gameplayDataFilePath);
        this.alreadySavedCrucialWords = {
            weakWords: loaded.weak,
            strongWords: loaded.strong,
            masteredWords: loaded.mastered,
        };
    }

    protected removeArchivedAtProperty(arr: ArchivedWord[]): Word[] {
        return arr.map((word) => {
            const { expected, displayed } = word;
            return { expected, displayed };
        });
    }

    public async main(): Promise<CrucialWords> {
        await this.loadAlreadySavedCrucialWords();
        this.determineAllCrucialWords();
        const newCrucialWords: NewCrucialWords = this.determineWhichCrucialWordIsNew();
        const removedCrucialWords: RemovedCrucialWords = this.determineWhichCrucialWordWasRemoved();
        await this.saveChanges();

        return {
            words_made_mastered: this.removeArchivedAtProperty(newCrucialWords.masteredWords as ArchivedWord[]),
            words_made_strong: this.removeArchivedAtProperty(newCrucialWords.strongWords as ArchivedWord[]),
            words_made_weak: this.removeArchivedAtProperty(newCrucialWords.weakWords as ArchivedWord[]),
            words_removed_from_strong: this.removeArchivedAtProperty(removedCrucialWords.strongWords as ArchivedWord[]),
            words_removed_from_weak: this.removeArchivedAtProperty(removedCrucialWords.weakWords as ArchivedWord[]),
        };
    }
}

export default (filename: string, points: ProgressPoints) => new DetermineCrucialWords(filename, points).main();
