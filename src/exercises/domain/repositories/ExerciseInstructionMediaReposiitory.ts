import { ExerciseInstructionMediaI } from "../entitiesI/ExerciseInstructionMediaI";

export interface ExerciseInstructionMediaRepository {
    create(exercise_media: ExerciseInstructionMediaI): Promise<ExerciseInstructionMediaI>;
}