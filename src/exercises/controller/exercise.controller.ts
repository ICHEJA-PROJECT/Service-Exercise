import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
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

    @Get('/porcentage') 
    @HttpCode(HttpStatus.OK)
    async getPorcentageByIdAndSkill(@Query('id') id: string, @Query('skillId') skillId: string) {
        return await this.exerciseService.getPorcentageByIdAndSkill(parseInt(id), parseInt(skillId));
    }

    @Get('pupil/:id/learning-path')
    @HttpCode(HttpStatus.OK)
    async findByPupil(@Param('id') id: number, @Query('learningPathId') learningPathId: number) {
        return await this.exerciseService.findByPupil(id, learningPathId);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: number) {
        return await this.exerciseService.findOne(id);
    }
}