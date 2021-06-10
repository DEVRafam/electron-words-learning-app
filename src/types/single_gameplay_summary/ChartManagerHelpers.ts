type CSSClass = "active" | "unactive";
export default interface ChartManagerHelpers {
    cssClasses: {
        isBar: CSSClass;
        isPie: CSSClass;
    };
    setPie: () => void;
    setBar: () => void;
}
