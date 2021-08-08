import { TitleAndDescriptionRestrictions } from "@/types/LengthRestrictions";

export default {
    title: {
        min: 10,
        max: 50,
    },
    description: {
        min: 10,
        max: 150,
    },
} as TitleAndDescriptionRestrictions;
