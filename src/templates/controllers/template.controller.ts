import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { TemplateService } from "../services/template.service";
import { CreateTemplateDto } from "../data/dtos/create-template.dto";
import { GetTemplatesByTopicsDto } from "../data/dtos/get-templates-by-topics.dto";

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTemplateDto: CreateTemplateDto) {
        return await this.templateService.create(createTemplateDto);
    }

    @Get('topics')
    @HttpCode(HttpStatus.OK)
    async getByTopics(@Body() getTemplatesByTopicsDto: GetTemplatesByTopicsDto) {
        return this.templateService.findByTopics(getTemplatesByTopicsDto.topicIds);
    }

    @Get('/topic/:id')
    @HttpCode(HttpStatus.OK)
    async getByTopic(@Param('id') id: number) {
        return await this.templateService.findByTopic(id);
    }

}