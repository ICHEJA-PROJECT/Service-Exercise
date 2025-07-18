import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { TemplateService } from "../services/template.service";
import { CreateTemplateDto } from "../data/dtos/create-template.dto";

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTemplateDto: CreateTemplateDto) {
        return await this.templateService.create(createTemplateDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.templateService.findAll();
    }

    @Get('topics')
    @HttpCode(HttpStatus.OK)
    async getByTopics(@Query('topics') topics: string) {
        let parsedTopics: number[];
        parsedTopics = topics.split(',').map(topic => parseInt(topic.trim()));
        return this.templateService.findByTopics(parsedTopics);
    }

    @Get('/topic/:id')
    @HttpCode(HttpStatus.OK)
    async getByTopic(@Param('id') id: number) {
        return await this.templateService.findByTopic(id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number) {
        return await this.templateService.findOne(id);
    }

}