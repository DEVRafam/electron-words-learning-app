// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Array<T> {
    // existing methods:
    indexOf(item: T): number;
    includes(item: T): boolean;
    // own methods:
    remove(item: T): void;
    withoutDuplicates(): T[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Array.prototype.indexOf = function (item: any): number {
    let index = 0;
    if (typeof item === "object") {
        const keys = Object.keys(item);
        for (const element of this) {
            let matchedProperites = 0;
            keys.forEach((key) => {
                if (element[key] === item[key]) matchedProperites += 1;
            });
            if (matchedProperites === keys.length) return index;
            else index += 1;
        }
    } else {
        for (const element of this) {
            if (element === item) return index;
            else index += 1;
        }
    }
    return -1;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Array.prototype.includes = function (item: any) {
    return this.indexOf(item) !== -1;
};

Array.prototype.withoutDuplicates = function () {
    return [...new Set(this.map((el) => JSON.stringify(el)))].map((el) => JSON.parse(el));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Array.prototype.remove = function (item: any) {
    this.splice(this.indexOf(item), 1);
    if (this.indexOf(item) !== -1) this.remove(item);
};
