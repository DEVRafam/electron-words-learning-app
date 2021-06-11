import { chartVisualType, chartDataType } from "@/composable/single_gameplay_summary/useChart";
import ChartManagerHelpers from "@/types/single_gameplay_summary/ChartManagerHelpers";
import { emphasizeSectionDisplay } from "@/composable/single_gameplay_summary/__utils/emphasize";
export default (): ChartManagerHelpers => {
    return {
        cssClasses: {
            isBar: () => (chartVisualType.value === "bar" ? "active" : "unactive"),
            isPie: () => (chartVisualType.value === "pie" ? "active" : "unactive"),
        },
        buttonsDisables: {
            areUserAnswers: () => chartDataType.value === "answers" && !emphasizeSectionDisplay.value,
            areCrucialWords: () => chartDataType.value === "crucials" && !emphasizeSectionDisplay.value,
        },
        setPie: () => (chartVisualType.value = "pie"),
        setBar: () => (chartVisualType.value = "bar"),
        setAnswers: () => {
            chartDataType.value = "answers";
            emphasizeSectionDisplay.value = false;
        },
        setCrucials: () => {
            chartDataType.value = "crucials";
            emphasizeSectionDisplay.value = false;
        },
    };
};
