import { Exercise } from "../entities/Exercise";
import { ExerciseI } from "../entitiesI/ExerciseI";

export interface ExerciseRepository {
    create(exercise: Exercise): Promise<ExerciseI>;
    findOne(id: number): Promise<ExerciseI>;
}