import DropFileEvent from "@/types/DropFileEvent";
import importNewWords from "@/composable/datasets_manager/__utils/importing/importNewWords";

export default async (e: DropFileEvent) => {
    const file = e.dataTransfer.files[0];
    if (file) await importNewWords(file);
};
