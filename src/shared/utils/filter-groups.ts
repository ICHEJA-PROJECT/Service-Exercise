export function filterGroups(firstGroup: number[], secondGroup: number[]): number[] {
    const setSecondGroup = new Set(secondGroup);
    return firstGroup.filter(id => setSecondGroup.has(id));
}