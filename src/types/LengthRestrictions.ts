export default interface LengthRestrictions {
    min: number;
    max: number;
    forbiddenCharacters?: string[];
}

export interface TitleAndDescriptionRestrictions {
    title: LengthRestrictions;
    description: LengthRestrictions;
}
