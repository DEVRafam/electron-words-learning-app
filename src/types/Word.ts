export default interface Word {
    expected: string;
    displayed: string;
}

export type WordsDivisionCategories = "strong" | "invalid" | "words_made_mastered" | "rescued" | "words_made_strong" | "words_made_weak" | "words_removed_from_weak" | "words_removed_from_strong";
