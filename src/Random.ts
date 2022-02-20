// Contains functions related to random number generation.

interface RemoveRandomItemResult<T> {
    remainingItems: T[];
    removedItem: T;
}

export function removeRandomItemFromArray<T>(items: T[]): RemoveRandomItemResult<T> {
    if (items.length === 0) {
        throw new Error("Cannot remove an item from an empty array");
    } else {
        const indexToRemove = randomIntInclusive(0, items.length - 1);
        const remainingItems = items.filter((_, index) => index !== indexToRemove);
        const removedItem = items.filter((_, index) => index === indexToRemove)[0];

        console.assert(remainingItems.length === items.length - 1);
        console.assert(removedItem !== null);
        console.assert(removedItem !== undefined);

        return {
            remainingItems,
            removedItem,
        }
    }
}

function randomIntInclusive(min: number, max: number): number {
    const min2 = Math.ceil(min); // min2 is inclusive
    const max2 = Math.floor(max) + 1; // Add 1 because max2 is exclusive
    return Math.floor((Math.random() * (max2 - min2)) + min2);
}