import { ref, watch, computed } from "vue";
import printChart from "@/composable/single_gameplay_summary/__utils/chart/printChart";
import _managerHelper from "@/composable/single_gameplay_summary/__utils/chart/chartManagerHelpers";
import ChartManagerHelpers from "@/types/single_gameplay_summary/ChartManagerHelpers";
import { data } from "@/composable/single_gameplay_summary/useSummary";
//
export const CTXElementID = "users-answers-chart";
//
export const refreshHelper = ref<number>(0);
export const chartVisualType = ref<"pie" | "bar">("pie");
export const chartDataType = ref<"answers" | "crucials">("answers");
export const managerHelper = (): ChartManagerHelpers => _managerHelper();
export const blockCrucialWordsChart = computed<boolean>(() => {
    return !Object.values(data.value.crucial_words).find((arr) => arr.length > 0);
});
//
watch(chartVisualType, () => {
    setTimeout(printChart, 0);
    refreshHelper.value += 1;
});
watch(chartDataType, () => {
    setTimeout(printChart, 0);
    refreshHelper.value += 1;
});
//
export default { chartVisualType, refreshHelper, CTXElementID, chartDataType, printChart, managerHelper, blockCrucialWordsChart };
