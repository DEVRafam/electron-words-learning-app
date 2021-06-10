// INTERFACE for export default
import GeneratedPropertiesForChart from "@/types/single_gameplay_summary/GeneratedPropertiesForChart";
// utils
import generateData from "@/composable/single_gameplay_summary/__utils/chart/generators/dataGenerator";
import generateColors from "@/composable/single_gameplay_summary/__utils/chart/generators/colors";
import generateLegend from "@/composable/single_gameplay_summary/__utils/chart/generators/legend";
import generateLabels from "@/composable/single_gameplay_summary/__utils/chart/generators/labels";
//
export default (): GeneratedPropertiesForChart => {
    const data = generateData();
    return {
        labels: generateLabels(data),
        colors: generateColors(),
        legend: generateLegend(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: Object.values(data).map((target: any[]) => target.length),
    };
};
