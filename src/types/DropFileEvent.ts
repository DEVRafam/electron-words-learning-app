export default interface DropFileEvent extends DragEvent {
    dataTransfer: DataTransfer & {
        files: FileList;
    };
}
