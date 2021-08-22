export default (word: string, addDate = true): string => {
    const letters = {
        ą: "a",
        ä: "a",
        ę: "e",
        ż: "z",
        ź: "z",
        ó: "o",
        ö: "o",
        ł: "l",
        ć: "c",
        ń: "n",
        ś: "s",
        ü: "u",
        ß: "b",
        _: "-",
        "#": "-",
        "%": "-",
        "?": "-",
        " ": "-",
    };
    //
    let result: string | string[] = word.toLowerCase().split("") as string[];
    result.forEach((letter, index) => {
        if (Object.keys(letters).includes(letter)) {
            (result as string[])[index] = (letters as any)[letter];
        }
    });
    //
    result = result.join("") as string;
    if (addDate) result += Date.now();

    return result;
};
