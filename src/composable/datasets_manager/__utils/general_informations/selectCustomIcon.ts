import FileInputEvent from "@/types/FileInputEvent";
import useNotification from "@/composable/useNotification";

import { customIcon, customIconURL } from "@/composable/datasets_manager/submodules/useGeneralInformations";

class InvalidExtensionError extends Error {}
class ToBigFileSizeError extends Error {}

class SelectOwnIcon {
    protected readonly VALID_EXTENSIONS = ["image/png", "image/jpeg"];
    protected readonly MAXIMUM_SIZE = 1048576; // 1MB
    constructor(protected file: File) {}

    validate() {
        if (this.VALID_EXTENSIONS.indexOf(this.file.type) === -1) {
            throw new InvalidExtensionError();
        }
        if (this.MAXIMUM_SIZE < this.file.size) {
            throw new ToBigFileSizeError();
        }
    }

    async saveUseGeneralInformationProperty() {
        customIcon.value = this.file;
        await this.generateImageURL();
    }

    async generateImageURL() {
        await new Promise<void>((resolve, reject) => {
            const reader = new FileReader();

            reader.onerror = reject;
            reader.onload = () => {
                customIconURL.value = reader.result as string;
                resolve();
            };
            reader.readAsDataURL(this.file);
        });
    }
    async main() {
        this.validate();
        this.saveUseGeneralInformationProperty();
    }
}

export default async (e: FileInputEvent) => {
    const selectedIconFile = e.target.files[0];
    if (selectedIconFile instanceof File) {
        try {
            await new SelectOwnIcon(selectedIconFile).main();
        } catch (e: unknown) {
            if (e instanceof InvalidExtensionError) {
                return useNotification("Invalid extension", "Custom icon image must be type either jpg or png", "negative");
            } else if (e instanceof ToBigFileSizeError) {
                return useNotification("Invalid file size", `Maximum size of the custom icon must be lower than 1MB`, "negative");
            }
        }
    }
};
