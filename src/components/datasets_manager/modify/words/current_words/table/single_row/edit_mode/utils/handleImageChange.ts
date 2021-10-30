import CurrentWord from "@/classes/CurrentWord";
import FileInputEvent from "@/types/FileInputEvent";
import useNotification from "@/composable/useNotification";

export default (word: CurrentWord) => {
    return (e: FileInputEvent) => {
        const f = e.target.files[0];
        if (f) {
            word._image = f;
            if (f.type.slice(0, 6) !== "image/") {
                word._image = null;
                return useNotification("Invalid file format", "Please select a photo", "negative", 0, 3000);
            }
            const reader = new FileReader();
            reader.onload = () => (word.modifications.displayed = reader.result as string);
            reader.readAsDataURL(f);
        }
    };
};
