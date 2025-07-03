import { ExerciseTypeI } from "../entitiesI/ExerciseTypeI";

export interface ExerciseTypeRepository {
    create(exercise_type: ExerciseTypeI): Promise<ExerciseTypeI>;
}