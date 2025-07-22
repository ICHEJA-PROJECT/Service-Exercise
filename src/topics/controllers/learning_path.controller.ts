
import { LearningPathService } from "../services/learning_path.service";
import { CreateLearningPathDto } from "../data/dtos/create-learning-path.dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { EXERCISE_SERVICE_OPTIONS } from "src/shared/constants/exercise_service_options";

@Controller("learning-path")
export class LearningPathController {
    constructor(private readonly learningPathService: LearningPathService) {}

    @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_LEARNING_PATH_CREATE })
    async create(@Payload() createLearningPathDto: CreateLearningPathDto) {
        return await this.learningPathService.create(createLearningPathDto);
    }

    @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_LEARNING_PATH_FIND_ALL })
    async getAll() {
        return await this.learningPathService.findAll();
    }

    @MessagePattern({ cmd: EXERCISE_SERVICE_OPTIONS.EXERCISE_LEARNING_PATH_FIND_BY_ID })
    async getOne(@Payload('id') id: number) {
        return await this.learningPathService.findOne(id);
    }
}