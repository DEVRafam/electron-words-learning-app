import { onBeforeUnmount } from "vue";
//
type ClickEvent = {
    key: string;
    fn(): void;
    ctrl?: boolean;
};
export default (eventList: ClickEvent[]) => {
    const handle = (e: KeyboardEvent) => {
        eventList.forEach((singleEvent: ClickEvent) => {
            if (e.key === singleEvent.key) {
                if (singleEvent.ctrl) {
                    if (e.ctrlKey) singleEvent.fn();
                } else singleEvent.fn();
            }
        });
    };
    //
    window.addEventListener("keydown", handle);
    onBeforeUnmount(() => {
        window.removeEventListener("keydown", handle);
    });
};
