export const trim = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
        return str;
    }

    let trimmedString = str.slice(0, maxLength);

    // Trim to the nearest word
    const lastSpaceIndex = trimmedString.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
        trimmedString = trimmedString.slice(0, lastSpaceIndex);
    }

    // Remove trailing non-alphanumeric characters
    trimmedString = trimmedString.replace(/[^a-zA-Z0-9]+$/, "");

    // Add ellipsis if the trimmed string is shorter than the original
    if (trimmedString.length < str.length) {
        trimmedString += "...";
    }

    return trimmedString;
};
