import { Ref, ComputedRef } from "vue";
import { GameplayDataFileForPreview } from "@/types/Gameplay";
import FileInputEvent from "@/types/FileInputEvent";

export default interface UseGeneralInformations {
    // Properties:
    title: Ref<string>;
    description: Ref<string>;
    iconName: Ref<string>;
    fancyLetters: Ref<string[]>;
    iconsList: Ref<string[]>;
    displaySelectIconPanel: Ref<boolean | null>;
    customIcon: Ref<File | null>;
    customIconURL: Ref<string | null>;
    iconBackgroundImage: ComputedRef<string>;
    // methods SYNC:
    betterIconName(iconName: string): string;
    selectCustomIcon(e: FileInputEvent): void;
    // methods ASYNC:
    loadAllIcons(): Promise<void>;
    initValues(data: GameplayDataFileForPreview | null): void;
}
