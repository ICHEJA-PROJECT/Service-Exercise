import { CreateTopicDto } from "src/topics/data/dtos/create-topic.dto";
import { TopicI } from "../entititesI/TopicI";

export interface TopicRepository {
    create(createTopic: CreateTopicDto): Promise<TopicI>;
    findOne(id: number): Promise<TopicI>;
    findByIds(ids: number[]): Promise<TopicI[]>;
}