import loadDatasetsInfo from "./__loadDatasetsInfo";
import loadGameplaysHistory from "./__loadGameplaysHistory";
import router from "@/router/index";

export default async () => {
    const { datasetsName } = router.currentRoute.value.params;
    if (!datasetsName) return router.push({ path: "/" });
    //
    await loadDatasetsInfo(datasetsName as string);
    await loadGameplaysHistory(datasetsName as string);
};
