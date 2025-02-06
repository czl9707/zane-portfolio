export function randomNoRepeats<T>(array: T[]) {
    let copy = array.slice(0);
    return function () {
        if (copy.length < 1) { copy = array.slice(0); }
        const index = Math.floor(Math.random() * copy.length);
        const item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}