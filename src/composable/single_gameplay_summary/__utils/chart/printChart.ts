import Chart from "@/composable/single_gameplay_summary/__utils/chart/chartGlobalConfiguration";
import { CTXElementID, chartVisualType } from "@/composable/single_gameplay_summary/useChart";
import chartsObjectPropiertiesGenerator from "@/composable/single_gameplay_summary/__utils/chart/chartsObjectPropiertiesGenerator";
//
export default () => {
    const { labels, colors, legend, data } = chartsObjectPropiertiesGenerator();
    const CTX = (document.getElementById(`${CTXElementID}`) as unknown as any).getContext("2d");
    //
    new Chart(CTX, {
        type: chartVisualType.value,
        data: {
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            legend,
            cutoutPercentage: 50,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
};
