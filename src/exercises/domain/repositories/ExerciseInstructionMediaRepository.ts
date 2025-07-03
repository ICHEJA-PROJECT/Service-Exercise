import { ExerciseInstructionMediaI } from "../entitiesI/ExerciseInstructionMediaI";

export interface ExerciseInstructionMediaRepository {
    create(exercise_instruction_media: ExerciseInstructionMediaI): Promise<ExerciseInstructionMediaI>;
    findByExercise(id: number): Promise<Array<ExerciseInstructionMediaI>>;
}