export function buildRelateExercise(student: any) {
    const questions: any[] = [];

    if (student.person.firstName) {
        questions.push({
            answer: student.person.firstName,
            question: "¿Cómo te llamas?"
        });
    }

    if (student.mother?.firstName) {
        questions.push({
            answer: student.mother.firstName,
            question: "¿Cómo se llama tu mamá?"
        });
    }

    if (student.father?.firstName) {
        questions.push({
            answer: student.father.firstName,
            question: "¿Cómo se llama tu papá?"
        });
    }

    return {
        content: questions
    };
}