import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { TopicService } from "../services/topic.service";
import { CreateTopicDto } from "../data/dtos/create-topic.dto";

@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.topicService.findAll();
    }

    @Get('pupils/:id/learning-path')
    @HttpCode(HttpStatus.OK)
    async getTopicsByPupil(@Param('id') id: number, @Query("learningPathId") learningPathId: number) {
        return await this.topicService.findByPupil(id, learningPathId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTopicDto: CreateTopicDto) {
        return await this.topicService.create(createTopicDto);
    }

    @Get('/:id/learning-paths')
    @HttpCode(HttpStatus.OK)
    async getTopic(@Param('id') id: number, @Query('learningPathId') learningPathId: number) {
        return await this.topicService.findOne(id, learningPathId);
    }
}