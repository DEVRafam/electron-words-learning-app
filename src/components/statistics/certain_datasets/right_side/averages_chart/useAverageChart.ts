// averagesForChart: (callback: (word: ProgressLogFile) => number | string) => ComputedRef<number[]>;
import { ref, computed } from "vue";
import averagesForChart from "./utils/averagesForChart";
import ProgressLogFile from "@/types/logger/ProgressLogFile";

export const chartDataType = ref<"accuration" | "draws" | "duration">("accuration");

export const chartAverage = (gamesHistory: ProgressLogFile[]) => {
    if (chartDataType.value === "accuration") {
        return averagesForChart(gamesHistory, (target) => target["accuracy[%]"] * 100).value;
    }
    //
    else if (chartDataType.value === "draws") {
        return averagesForChart(gamesHistory, (target) => target.number_of_draws * 1).value;
    }
    //
    else if (chartDataType.value === "duration") {
        return averagesForChart(gamesHistory, (target) => target.session["duration[s]"] * 1).value;
    }
    //
    else return [1, 2];
};

export const chartData = (gamesHistory: ProgressLogFile[]) => {
    if (chartDataType.value === "accuration") {
        return gamesHistory.map((target) => target["accuracy[%]"] * 100) as number[];
    }
    //
    else if (chartDataType.value === "draws") {
        return gamesHistory.map((target) => target.number_of_draws * 1) as number[];
    }
    //
    else if (chartDataType.value === "duration") {
        return gamesHistory.map((target) => target.session["duration[s]"] * 1) as number[];
    } else return [1, 2];
};

export const chartLabel = computed<string>(() => {
    if (chartDataType.value === "accuration") return "Answers accuration [%]";
    else if (chartDataType.value === "draws") return "Amount of draws";
    else return "Gameplays duration [s]";
});

// export default { chartDataType, chartData, chartAverage, chartLabel };
