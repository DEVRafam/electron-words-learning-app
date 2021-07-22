import { Ref, ComputedRef } from "vue";
// types
import FileInputEvent from "@/types/FileInputEvent";
import DropFileEvent from "@/types/DropFileEvent";

export default interface UseImporting {
    // Properties:
    importingResult: Ref<"positive" | "negative" | null>;
    displayUndoButton: ComputedRef<boolean>;
    // methods SYNC:
    handleImportingUndo(): void;
    // methods ASYNC:
    importOnDragAndDrop(e: DropFileEvent): Promise<void>;
    importOnInputChange(e: FileInputEvent): Promise<void>;
}
