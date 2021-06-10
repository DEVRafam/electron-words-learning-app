import { chartVisualType } from "@/composable/single_gameplay_summary/useChart";
import ChartManagerHelpers from "@/types/single_gameplay_summary/ChartManagerHelpers";

export default (): ChartManagerHelpers => {
    return {
        cssClasses: {
            isBar: chartVisualType.value === "bar" ? "active" : "unactive",
            isPie: chartVisualType.value === "pie" ? "active" : "unactive",
        },
        setPie: () => (chartVisualType.value = "pie"),
        setBar: () => (chartVisualType.value = "bar"),
    };
};
