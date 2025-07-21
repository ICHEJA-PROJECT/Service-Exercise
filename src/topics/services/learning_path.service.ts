import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { LearningPathRepositoryImpl } from "../data/repositories/learning_path.repository.impl";
import { LearningPathRepository } from "../domain/repositories/LearningPathRepository";
import { CreateLearningPathDto } from "../data/dtos/create-learning-path.dto";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class LearningPathService {
    constructor(@Inject(LearningPathRepositoryImpl) private readonly learningPathRepository: LearningPathRepository) {}

    async create(createLearningPathDto: CreateLearningPathDto) {
        try {
            const learningPath = await this.learningPathRepository.create(createLearningPathDto);
            return learningPath;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll() {
        try {
            const learningPaths = await this.learningPathRepository.findAll();
            return learningPaths;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number) {
        try {
            const learningPath = await this.learningPathRepository.findOne(id);
            return learningPath;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }
}