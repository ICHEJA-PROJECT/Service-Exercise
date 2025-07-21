import { HttpStatus, Inject } from "@nestjs/common";
import { LearningPathRepositoryImpl } from "../data/repositories/learning_path.repository.impl";
import { LearningPathRepository } from "../domain/repositories/LearningPathRepository";
import { CreateLearningPathDto } from "../data/dtos/create-learning-path.dto";
import { RpcException } from "@nestjs/microservices";

export class LearningPathService {
    constructor(@Inject(LearningPathRepositoryImpl) private readonly learningPathRepository: LearningPathRepository) {}

    async create(createLearningPathDto: CreateLearningPathDto) {
        try {
            const learningPath = await this.learningPathRepository.create(createLearningPathDto);
            return learningPath;
        } catch (error) {
            throw new RpcException({
                message: error.message || "Error al crear una ruta de aprendizaje",
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    async findAll() {
        try {
            const learningPaths = await this.learningPathRepository.findAll();
            return learningPaths;
        } catch (error) {
            throw new RpcException({
                message: error.message || "Error al obtener las rutas de aprendizaje",
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    async findOne(id: number) {
        try {
            const learningPath = await this.learningPathRepository.findOne(id);
            return learningPath;
        } catch (error) {
            throw new RpcException({
                message: error.message || "Error al obtener la ruta de aprendizaje",
                status: HttpStatus.INTERNAL_SERVER_ERROR
            });
        }
    }
}