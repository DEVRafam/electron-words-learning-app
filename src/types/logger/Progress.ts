import Word from "@/types/Word";

export interface Answers {
    valid: Word[];
    rescued: Word[];
    invalid: Word[];
}

export type ProgressPoints = Record<string, number>;

export default interface ProgressLog {
    "accuracy[%]": number | null;
    number_of_draws: number;
    start: {
        UTC: string;
        raw: number;
    };
    answers: Answers;
}
