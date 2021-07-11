import "../helpers/ArrayPrototypeImprovements";

const wordsArrayOne = [
    { expected: "astonished", displayed: "zdumiony" },
    { expected: "humongous", displayed: "gigantyczny" },
    { expected: "crucial", displayed: "istotny" },
];
const wordsArrayTwo = [
    { expected: "species", displayed: "gatunki" },
    { expected: "i feel like", displayed: "mam ochote" },
    { expected: "hesitation", displayed: "wahanie" },
];

describe(".clone()", () => {
    it("Should clone array", () => {
        const arr = [1, 2, 3, 4, 5];
        const clonned = arr.clone();

        arr.push(5);
        expect(arr.includes(5)).toBeTruthy;
        expect(clonned.includes(5)).toBeFalsy;

        clonned.push(50);
        expect(clonned.includes(50)).toBeTruthy;
        expect(arr.includes(50)).toBeFalsy;
    });
});

describe(".indexOf()", () => {
    const checkEntireArray = (arr: unknown[]) => {
        arr.forEach((val, index) => {
            expect(arr.indexOf(val)).toEqual(index);
        });
    };

    it("Single basic type array", () => {
        checkEntireArray([1, 2, 3, 4, 5, 6]);
    });
    it("Multiple basic types array", () => {
        checkEntireArray([1, "2", 2, "asdsadas", 5, 6]);
    });
    it("Array with object type elements", () => {
        checkEntireArray(wordsArrayOne.clone());
    });
    it("Array full of random objects", () => {
        checkEntireArray([
            { exa4234pected: "astonished", displ13123ayed: "zdumiony" },
            { adasd: "humongous", a11adsa: "gigantyczny" },
            { a111a: "crucial", asdas: "istotny" },
        ]);
    });
});

describe(".includes()", () => {
    const checkEntireArray = (arr: unknown[], randomProperites: unknown[]) => {
        arr.forEach((val) => {
            expect(arr.includes(val)).toBeTruthy;
        });
        randomProperites.forEach((val) => {
            expect(arr.includes(val)).toBeFalsy;
        });
    };

    it("Single basic type array", () => {
        checkEntireArray([1, 2, 3, 4, 5, 6], [50, 100]);
    });
    it("Multiple basic types array", () => {
        checkEntireArray([1, "2", 2, "asdsadas", 5, 6], [10, "kgs", "!#@"]);
    });
    it("Array with object type elements", () => {
        checkEntireArray(wordsArrayOne.clone(), wordsArrayTwo.clone());
    });
    it("Array full of random objects", () => {
        checkEntireArray(
            [
                { exa4234pected: "astonished", displ13123ayed: "zdumiony" },
                { adasd: "humongous", a11adsa: "gigantyczny" },
                { a111a: "crucial", asdas: "istotny" },
            ],
            wordsArrayOne.clone()
        );
    });
});

describe(".withoutDuplicates()", () => {
    it("Basic type array", () => {
        const arr = [1, 2, 3, 4, 5, 6, 1, 5, 1, 3, 5, 1, 3];
        expect(arr).not.toStrictEqual([1, 2, 3, 4, 5, 6]);
        expect(arr.withoutDuplicates()).toStrictEqual([1, 2, 3, 4, 5, 6]);
    });

    it("Array with object type elements", () => {
        const arr = wordsArrayOne.clone();
        arr.push(arr[1]);
        arr.push(arr[1]);
        expect(arr).not.toStrictEqual(wordsArrayOne);
        expect(arr.withoutDuplicates()).toStrictEqual(wordsArrayOne);
    });
});

describe(".remove()", () => {
    it("Basic type array", () => {
        const arr = [1, 2, 3, 1, 1, 1, 4];
        expect(arr).toContain(1);
        arr.remove(1);
        expect(arr).not.toContain(1);
    });

    it("Array with object type elements", () => {
        const arr = wordsArrayOne.clone();

        [
            { expected: "astonished", displayed: "zdumiony" },
            { displayed: "gigantyczny", expected: "humongous" },
        ].forEach((arrItem) => {
            expect(arr).toContain(arrItem);
            arr.remove(arrItem);
            expect(arr).not.toContain(arrItem);
        });
    });
});
