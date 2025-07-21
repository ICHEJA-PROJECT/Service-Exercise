import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { LearningPathService } from "../services/learning_path.service";
import { CreateLearningPathDto } from "../data/dtos/create-learning-path.dto";

@Controller("learning-path")
export class LearningPathController {
    constructor(private readonly learningPathService: LearningPathService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLearningPathDto: CreateLearningPathDto) {
        return await this.learningPathService.create(createLearningPathDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.learningPathService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id: number) {
        return await this.learningPathService.findOne(id);
    }
}