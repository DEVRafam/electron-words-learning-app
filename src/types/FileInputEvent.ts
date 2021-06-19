export default interface InputFile extends InputEvent {
    target: HTMLInputElement & {
        files: FileList;
    };
}
