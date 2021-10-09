import { ImportedDataset } from "@/types/Gameplay";
import LengthRestrictions from "@/types/LengthRestrictions";
import Word from "@/types/Word";
import { JSONFileSyntaxError } from "@/classes/Errors";
import { restrictions } from "@/composable/datasets_manager/submodules/useGeneralInformations";

export default class LoadedFileStructureValidator {
    // Properties
    protected readonly singleWordRestrictions: LengthRestrictions = {
        min: 3,
        max: Number(process.env.VUE_APP_MAXIMUM_LENGTH_OF_WORD) || 20,
    };
    protected readonly fancyLetterRestrictions: LengthRestrictions = {
        min: 1,
        max: 1,
    };
    public constructor(protected fileContent: ImportedDataset) {}
    // Methods
    protected __throwError(): void {
        throw new JSONFileSyntaxError();
    }
    protected __validate = (target: unknown, restrictions: LengthRestrictions): boolean => {
        if (typeof target !== "string") return false;
        return target.length <= restrictions.max && target.length >= restrictions.min;
    };

    protected ensureIsObject(): void {
        if (!(this.fileContent instanceof Object)) this.__throwError();
    }

    protected validateKeys(): void {
        const fileContentKeys = Object.keys(this.fileContent);
        const properKeys = ["title", "description", "pronunciationLanguage", "fancyLetters", "words"];

        if (fileContentKeys.length !== properKeys.length) this.__throwError();
        properKeys.forEach((key) => {
            if (!fileContentKeys.includes(key)) this.__throwError();
        });
    }

    // title, description and pronunciationLanguage
    protected validateSimpleProperties(): void {
        const { __validate, __throwError } = this;
        const titleIsInvalid = !__validate(this.fileContent.title, restrictions.title);
        const descriptionIsInvalid = !__validate(this.fileContent.description, restrictions.description);
        const languageIsInvalid =
            this.fileContent.pronunciationLanguage !== false &&
            !__validate(this.fileContent.pronunciationLanguage, {
                min: 3,
                max: 20,
            } as LengthRestrictions);

        if (titleIsInvalid || descriptionIsInvalid || languageIsInvalid) __throwError();
    }

    protected validateWords(): void {
        const { __validate, __throwError, singleWordRestrictions } = this;
        if (!(this.fileContent.words instanceof Array)) return __throwError();

        this.fileContent.words = this.fileContent.words.filter((target: unknown): boolean => {
            if (!(target instanceof Object)) return false;
            for (const key of ["expected", "displayed"]) {
                if (!Object.keys(target).includes(key)) return false;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!__validate((target as any)[key], singleWordRestrictions)) return false;
            }
            return true;
        });

        this.fileContent.words = this.fileContent.words.map((target: Word) => ({ expected: target.expected, displayed: target.displayed }));
    }

    protected validateFancyWords(): void {
        const { __validate, fancyLetterRestrictions } = this;
        if (!(this.fileContent.fancyLetters instanceof Array)) {
            this.fileContent.fancyLetters = [];
            return;
        }
        this.fileContent.fancyLetters = this.fileContent.fancyLetters.filter((target) => __validate(target, fancyLetterRestrictions));
    }

    public main() {
        this.ensureIsObject();
        this.validateKeys();
        this.validateSimpleProperties();
        this.validateWords();
        this.validateFancyWords();
    }
}
