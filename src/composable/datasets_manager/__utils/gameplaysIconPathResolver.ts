import path from "path";

import { GameplayDataFileForPreview } from "@/types/Gameplay";
import { iconsPath } from "@/composable/paths";

export default (data: GameplayDataFileForPreview | string): string => {
    let result = "";

    if (typeof data === "object") {
        if (process.env.NODE_ENV === "production") {
            result = `file:://${path.resolve(path.join(iconsPath, data.icon)).replace(/\\/g, "/")}`;
        } else result = `/images/gameplay_icons/${data.icon}`;
    }
    //
    else {
        if (process.env.NODE_ENV === "production") {
            result = `file:://${path.resolve(path.join(iconsPath, data)).replace(/\\/g, "/")}`;
        } else result = `/images/gameplay_icons/${data}`;
    }
    return `background-image: url('${result}')`;
};
