import Word from "@/types/Word";

export interface Answers {
    invalid: Word[];
    valid: Word[];
    rescued: Word[];
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
