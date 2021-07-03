import { GameplayDataFileForPreview } from "@/types/Gameplay";

export default (data: GameplayDataFileForPreview | string): string => {
    if (typeof data === "object") {
        const img = `images/gameplay_icons/${data.icon}`;
        return `background-image: url('${img}')`;
    } else {
        const img = `images/gameplay_icons/${data}`;
        return `background-image: url('${img}')`;
    }
};
