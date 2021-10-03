import loadDatasetsInfo from "./__loadDatasetsInfo";
import loadGameplaysHistory from "./__loadGameplaysHistory";
import loadCrucialWords from "./__loadCrucialWords";
import router from "@/router/index";

export default async () => {
    const { datasetsName } = router.currentRoute.value.params;
    if (!datasetsName) return router.push({ path: "/" });
    //
    try {
        await loadDatasetsInfo(datasetsName as string);
        await loadGameplaysHistory(datasetsName as string);
        await loadCrucialWords(datasetsName as string);
    } catch (e) {
        router.push({ path: "/" });
    }
};
