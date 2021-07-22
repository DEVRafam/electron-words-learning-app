export default (iconName: string): string => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [name, _] = iconName.split(".");
    return name
        .split("_")
        .map((word) => {
            const [firstLetter, ...rest] = word;
            return firstLetter.toUpperCase() + rest.join("");
        })
        .join(" ")
        .slice(0, 25);
};
