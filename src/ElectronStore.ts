import Store from "electron-store";

export default new Store({
    schema: {
        fullscreen: {
            type: "boolean",
        },
    },
    watch: true,
});
