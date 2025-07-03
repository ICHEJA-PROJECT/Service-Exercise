import { TypeExerciseI } from "../entitiesI/TypeExerciseI";

export interface TypeExerciseRepository {
    createType(type_exercise: keyof TypeExerciseI): Promise<TypeExerciseI>;
    findAll(): Array<TypeExerciseI>;
}