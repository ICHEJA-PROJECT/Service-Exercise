import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from "@nestjs/common";
import { SkillService } from "../services/skill.service";
import { CreateSkillDto } from "../data/dtos/create-skill.dto";

@Controller('skills')
export class SkillController {
    constructor(private readonly skillService: SkillService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createSkillDto: CreateSkillDto) {
        return await this.skillService.create(createSkillDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.skillService.findAll();
    }

    @Get('/templates')
    @HttpCode(HttpStatus.OK)
    async getByTemplates(@Query('skills') skills: string) {
        let parsedSkills: number[];
        parsedSkills = skills.split(',').map(skill => parseInt(skill.trim()));
        return await this.skillService.findByTemplates(parsedSkills);
    }
} 