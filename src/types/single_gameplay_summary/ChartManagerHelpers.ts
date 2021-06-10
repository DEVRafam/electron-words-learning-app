type CSSClass = "active" | "unactive";
export default interface ChartManagerHelpers {
    cssClasses: {
        isBar: () => CSSClass;
        isPie: () => CSSClass;
    };
    buttonsDisables: {
        areUserAnswers: () => boolean;
        areCrucialWords: () => boolean;
    };
    setPie: () => void;
    setBar: () => void;
    setAnswers: () => void;
    setCrucials: () => void;
}
