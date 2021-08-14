import { datasetToModify, previewModifySection } from "@/composable/datasets_manager/useModifier";

export default () => {
    datasetToModify.value = {
        title: "",
        description: "",
        icon: "__NONE__",
        pronunciationLanguage: false,
        fancyLetters: [],
        fileName: "",
        wordsAmount: 0,
        lastModified: "",
        createdAt: "",
        _justCreated: true,
        _rawTimes: {
            lastModified: 0,
            createdAt: 0,
        },
    };
    //
    previewModifySection.value = true;
};
