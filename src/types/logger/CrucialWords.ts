import Word from "@/types/Word";

export interface CrucialWordsDeterminationResult<T extends string | Word> {
    masteredWords: T[];
    strongWords: T[];
    weakWords: T[];
}

export type NewCrucialWords = CrucialWordsDeterminationResult<Word>;
export type RemovedCrucialWords = Omit<CrucialWordsDeterminationResult<Word>, "masteredWords">;

export interface CrucialWords {
    words_made_mastered: Word[];
    words_made_strong: Word[];
    words_made_weak: Word[];
    words_removed_from_strong: Word[];
    words_removed_from_weak: Word[];
}
