import { CreateExerciseDto } from "src/exercises/data/dtos/create-exercise.dto";
import { ExerciseI } from "../entitiesI/ExerciseI";

export interface ExerciseRepository {
    create(createExerciseDto: CreateExerciseDto): Promise<ExerciseI>;
    findAll(): Promise<ExerciseI[]>;
    findOne(id: number): Promise<ExerciseI>;
    findByTemplate(idTemplate: number): Promise<ExerciseI[]>;
    countExercisesByTemplate(exerciseIds: number[]): Promise<any>;
    getPorcentageByIdAndSkill(id: number, skillId: number): Promise<any>;
    getPorcentages(id: number): Promise<any>;
    findByIds(ids: number[]): Promise<ExerciseI[]>;
    findByTemplatesOnlyIds(templatesIds: number[]): Promise<number[]>;
}