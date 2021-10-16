import path from "path";

import { DatasetFileForPreview } from "@/types/Dataset";
import { iconsPath } from "@/composable/paths";

export default (data: DatasetFileForPreview | string): string => {
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
