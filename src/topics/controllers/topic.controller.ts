import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { TopicService } from "../services/topic.service";
import { CreateTopicDto } from "../data/dtos/create-topic.dto";

@Controller('topics')
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get('pupils/:id')
    @HttpCode(HttpStatus.OK)
    async getTopicsByPupil(@Param('id') id: number) {
        return await this.topicService.findByPupil(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTopicDto: CreateTopicDto) {
        return await this.topicService.create(createTopicDto);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getTopic(@Param('id') id: number) {
        return await this.topicService.findOne(id);
    }
}