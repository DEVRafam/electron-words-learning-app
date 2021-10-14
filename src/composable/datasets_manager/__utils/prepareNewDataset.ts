import { datasetToModify } from "@/composable/datasets_manager/useModifier";

export default () => {
    datasetToModify.value = {
        title: "",
        description: "",
        icon: "__NONE__",
        pronunciationLanguage: false,
        fancyLetters: [],
        fileName: "",
        wordsAmount: 0,
        words: [],
        lastModified: "",
        createdAt: "",
        _justCreated: true,
        _rawTimes: {
            lastModified: 0,
            createdAt: 0,
        },
    };
};
