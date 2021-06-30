import fse from "fs-extra";
import { iconsPath } from "@/composable/paths";
import { iconsList } from "@/composable/datasets_manager/useModifier-submodules/useGeneralInformations";

export default async () => {
    iconsList.value = await fse.readdir(iconsPath);
};
