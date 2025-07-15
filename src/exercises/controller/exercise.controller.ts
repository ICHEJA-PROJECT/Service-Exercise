import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { ExerciseService } from "../services/exercise.service";
import { CreateExerciseDto } from "../data/dtos/create-exercise.dto";

@Controller('exercises')
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createExerciseDto: CreateExerciseDto) {
        return await this.exerciseService.create(createExerciseDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        return await this.exerciseService.findAll();
    }

    @Get('pupil/:id')
    @HttpCode(HttpStatus.OK)
    async findByPupil(@Param('id') id: number) {
        return await this.exerciseService.findByPupil(id);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number) {
        return await this.exerciseService.findOne(id);
    }
}