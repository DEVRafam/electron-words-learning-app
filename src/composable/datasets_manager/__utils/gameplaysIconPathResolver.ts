import { GameplayDataFileForPreview } from "@/types/Gameplay";

export default (gameplay: GameplayDataFileForPreview): string => {
    const img = `images/gameplay_icons/${gameplay.icon}`;
    return `background-image: url('${img}')`;
};
