import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TemplateSkillService } from "../services/template_skill.service";
import { CreateTemplateSkillDto } from "../data/dtos/create-template-skill.dto";

@Controller('templates/skills')
export class TemplateSkillController {
    constructor(private readonly templateSkillService: TemplateSkillService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTemplateSkillDto: CreateTemplateSkillDto) {
        return await this.templateSkillService.create(createTemplateSkillDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.templateSkillService.findAll();
    }
}