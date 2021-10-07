import { TitleAndDescriptionRestrictions } from "@/types/LengthRestrictions";

export default {
    title: {
        min: 5,
        max: 25,
    },
    description: {
        min: 10,
        max: 50,
    },
} as TitleAndDescriptionRestrictions;
