export function filterGroups(firtsGroup: number[], secondGroup: number[]): number[] {
    const setSecondGroup = new Set(secondGroup);
    return firtsGroup.filter(id => setSecondGroup.has(id));
}