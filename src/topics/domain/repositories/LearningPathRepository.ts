import { CreateLearningPathDto } from "src/topics/data/dtos/create-learning-path.dto";
import { LearningPathI } from "../entititesI/LearningPathI";

export interface LearningPathRepository {
    create(createLearningPathDto: CreateLearningPathDto): Promise<LearningPathI>;
    findAll(): Promise<LearningPathI[]>;
    findOne(id: number): Promise<LearningPathI>;
}