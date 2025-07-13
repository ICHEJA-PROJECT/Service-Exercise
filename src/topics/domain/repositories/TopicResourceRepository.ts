import { CreateTopicResourceDto } from "src/topics/data/dtos/create-topic-resource.dto";
import { TopicResourceI } from "../entititesI/TopicResourceI";

export interface TopicResourceRepository {
    create(createTopicResourceDto: CreateTopicResourceDto): Promise<TopicResourceI>;
    findAll(): Promise<TopicResourceI[]>;
}