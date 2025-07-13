import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TopicResourceService } from "../services/topic_resource.service";
import { CreateTopicResourceDto } from "../data/dtos/create-topic-resource.dto";

@Controller('topic-resource')
export class TopicResourceController {
    constructor(private readonly topicResourceService: TopicResourceService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTopicResourceDto: CreateTopicResourceDto) {
        return await this.topicResourceService.create(createTopicResourceDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.topicResourceService.findAll();
    }
}