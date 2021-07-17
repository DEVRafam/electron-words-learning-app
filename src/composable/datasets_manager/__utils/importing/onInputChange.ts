import FileInputEvent from "@/types/FileInputEvent";
import importNewWords from "@/composable/datasets_manager/__utils/importing/importNewWords";

export default async (e: FileInputEvent) => {
    const file = e.target.files[0];
    await importNewWords(file);
    e.target.value = "";
};
