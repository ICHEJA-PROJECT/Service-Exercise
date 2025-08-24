export function buildFindExercise(allNames: string[], correctName: string, totalOptions: number = 5) {
    const availableNames = allNames.filter(name => 
    name.toLowerCase() !== correctName.toLowerCase()
    );

    if (availableNames.length < totalOptions - 1) {
    throw new Error(`No hay suficientes nombres únicos. Se necesitan al menos ${totalOptions - 1} nombres diferentes al nombre correcto.`);
    }

    const distractors: string[] = []; 
    const shuffledNames = [...availableNames].sort(() => Math.random() - 0.5);

    for (let i = 0; i < totalOptions - 1; i++) {
    distractors.push(shuffledNames[i]);
    }

    const correctPosition = Math.floor(Math.random() * totalOptions);

    const options: string[] = []; 
    let distractorIndex = 0;

    for (let i = 0; i < totalOptions; i++) {
    if (i === correctPosition) {
        options.push(correctName);
    } else {
        options.push(distractors[distractorIndex]);
        distractorIndex++;
    }
    }

    return {
    context: {
        options,
        right_option: correctPosition,
        base_sentence: correctName
    }
    };
}