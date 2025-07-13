import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TopicSequenceService } from "../services/topic_sequence.service";
import { CreateTopicSequenceDto } from "../data/dtos/create-topic-sequence.dto";

@Controller('topics-sequences')
export class TopicSequenceController {
    constructor(private readonly topicSequenceSevrice: TopicSequenceService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTopicSequenceDto: CreateTopicSequenceDto) {
        return await this.topicSequenceSevrice.create(createTopicSequenceDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.topicSequenceSevrice.findAll();
    }
}