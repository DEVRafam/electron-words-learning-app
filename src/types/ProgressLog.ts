// {
//     date: Thu May 27 22:04:19 2021;
//     session_duration[s]: 7;
//     number_of_draws: 1;
//     accuracy[%]: 0;
//     invalid: [];
//     valid: [];
//     points_generated_during_session: {};
//     progress: {
//       accuraty: 0;
//       deleted_words: [];
//       words_made_strong: [];
//       words_made_weak: [];
//       words_removed_from_strong: [];
//       words_removed_from_weak: []
// }
import Word from "@/types/Word";

export interface ProgressLogAnswers {
    invalid: Word[];
    valid: Word[];
    rescued: Word[];
}

export type ComputedProgressPoints = Record<string, number>;
export type PointsRates = Record<keyof ProgressLogAnswers, number>;

export default interface ProgressLog {
    "accuracy[%]": number | null;
    number_of_draws: number;
    start: {
        UTC: string;
        raw: number;
    };
    answers: ProgressLogAnswers;
}
