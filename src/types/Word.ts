export default interface Word {
    expected: string;
    displayed: string;
}

export interface NewWord extends Word {
    origin: "Inscribed" | string;
}

export interface ProgressiveWord extends Word {
    progressStatus: "strong" | "mastered" | "weak" | null;
    _determineProgress(strong: Word[], mastered: Word[], weak: Word[]): void;
}

export interface CurrentWord extends ProgressiveWord {
    // Properties
    modifications: Word;
    // Methods
    hasBeenModified(): boolean;
    isInDeletingList(): boolean;
    undoModifications(): void;
}

// export interface ArchivedWord extends ProgressiveWord {
export interface ArchivedWord extends Word {
    archivedAt: string;
}

export type WordsDivisionCategories = "strong" | "invalid" | "words_made_mastered" | "rescued" | "words_made_strong" | "words_made_weak" | "words_removed_from_weak" | "words_removed_from_strong";
