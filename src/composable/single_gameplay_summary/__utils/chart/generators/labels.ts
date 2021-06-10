import { Answers } from "@/types/logger/Progress";
import { CrucialWords } from "@/types/logger/CrucialWords";
import { chartDataType } from "@/composable/single_gameplay_summary/useChart";
//
const capitalize = (word: string): string => word.replace(/\b\w/g, (l) => l.toUpperCase());
export default (data: Answers | CrucialWords): string[] => {
    const keys = Object.keys(data);
    //
    if (chartDataType.value === "answers") return keys.map(capitalize);
    else {
        const labelsForCrucialWords = {
            words_made_mastered: "Mastered",
            words_made_strong: "Strong",
            words_made_weak: "Weak",
            words_removed_from_strong: "Past strong",
            words_removed_from_weak: "Past weak",
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return keys.map((target: string) => (labelsForCrucialWords as any)[target]);
    }
};
