import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { ResourceService } from "../services/resource.service";
import { CreateResourceDto } from "../data/dtos/create-resource.dto";

@Controller('resources')
export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.resourceService.findAll();
    }

    @Get('pupils/:id/learning-path')
    @HttpCode(HttpStatus.OK)
    async getByPupil(@Param('id') id: number, @Query('learningPathId') learningPathId: number) {
        return await this.resourceService.findByPupil(id, learningPathId);
    }
    
    @Get('topic/:id')
    @HttpCode(HttpStatus.OK)
    async getByTopic(@Param('id') id: number) {
        return await this.resourceService.findByTopic(id);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getById(@Param('id') id: number) {
        return await this.resourceService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createResourceDto: CreateResourceDto) {
        return await this.resourceService.create(createResourceDto);
    }
}