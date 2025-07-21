import { InjectRepository } from "@nestjs/typeorm";
import { LearningPathRepository } from "src/topics/domain/repositories/LearningPathRepository";
import { LearningPathEntity } from "../entities/learning_path.entity";
import { Repository } from "typeorm";
import { LearningPathI } from "src/topics/domain/entititesI/LearningPathI";
import { CreateLearningPathDto } from "../dtos/create-learning-path.dto";
import { RpcException } from "@nestjs/microservices";
import { HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class LearningPathRepositoryImpl implements LearningPathRepository {
    constructor(
        @InjectRepository(LearningPathEntity) private readonly learningPathRepository: Repository<LearningPathEntity>
    ) {}

    async create(createLearningPathDto: CreateLearningPathDto): Promise<LearningPathI> {
        try {
            const learningPath = this.learningPathRepository.create(createLearningPathDto);
            return await this.learningPathRepository.save(learningPath);
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findAll(): Promise<LearningPathI[]> {
        try {
            const learningPaths = await this.learningPathRepository.find();
            return learningPaths;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

    async findOne(id: number): Promise<LearningPathI> {
        try {
            const learningPath = await this.learningPathRepository.findOne({where: {id: id}});
            if(!learningPath) throw new RpcException({
                message: "No se encontro la ruta de aprendizaje",
                status: HttpStatus.NOT_FOUND
            });
            return learningPath;
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: HttpStatus.BAD_REQUEST
            });
        }
    }

}