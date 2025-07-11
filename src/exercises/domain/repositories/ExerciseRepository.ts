import { CreateExerciseDto } from "src/exercises/data/dtos/create-exercise.dto";
import { ExerciseI } from "../entitiesI/ExerciseI";

export interface ExerciseRepository {
    create(createExerciseDto: CreateExerciseDto): Promise<ExerciseI>;
    findOne(id: number): Promise<ExerciseI>;
    findByTemplate(idTemplate: number): Promise<ExerciseI[]>;
}