import { chartVisualType, chartDataType } from "@/composable/single_gameplay_summary/useChart";
import ChartManagerHelpers from "@/types/single_gameplay_summary/ChartManagerHelpers";

export default (): ChartManagerHelpers => {
    return {
        cssClasses: {
            isBar: () => (chartVisualType.value === "bar" ? "active" : "unactive"),
            isPie: () => (chartVisualType.value === "pie" ? "active" : "unactive"),
        },
        buttonsDisables: {
            areUserAnswers: () => chartDataType.value === "answers",
            areCrucialWords: () => chartDataType.value === "crucials",
        },
        setPie: () => (chartVisualType.value = "pie"),
        setBar: () => (chartVisualType.value = "bar"),
        setAnswers: () => (chartDataType.value = "answers"),
        setCrucials: () => (chartDataType.value = "crucials"),
    };
};
