import { WordsProgress } from "@/types/compositions/statistics/_useCertain";
import { Progress } from "@/types/compositions/statistics/_useComparisons";

export default (words: WordsProgress, totalWordsAmounts: number): Progress => {
    const { strong, weak, mastered } = words;
    const sl = strong.length;
    const ml = mastered.length;
    const wl = weak.length;

    if (!sl && !wl && !ml) return { level: "NONE", percentages: 0 };
    else if (ml >= sl && ml >= wl) return { level: "mastered", percentages: Math.round((ml * 100) / totalWordsAmounts) };
    else if (sl >= ml && sl >= wl) return { level: "strong", percentages: Math.round((sl * 100) / totalWordsAmounts) };
    else return { level: "weak", percentages: Math.round((wl * 100) / totalWordsAmounts) };
};
