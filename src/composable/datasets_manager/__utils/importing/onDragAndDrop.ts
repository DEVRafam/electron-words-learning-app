import DropFileEvent from "@/types/DropFileEvent";
import importNewWords from "@/composable/datasets_manager/__utils/importing/importNewWords";
import { dragging } from "@/composable/datasets_manager/submodules/useImporting";

export default async (e: DropFileEvent) => {
    const file = e.dataTransfer.files[0];
    dragging.value = false;
    if (file) await importNewWords(file);
};
