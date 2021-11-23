import Store from "electron-store";

export default new Store({
    schema: {
        fullscreen: {
            type: "boolean",
        },
        bounds: {
            type: "object",
        },
    },
    watch: true,
});
