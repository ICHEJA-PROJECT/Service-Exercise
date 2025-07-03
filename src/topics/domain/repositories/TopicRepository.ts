import { Topic } from "../entities/Topic";
import { TopicI } from "../entititesI/TopicI";

export interface TopicRepository {
    create(topic: Topic): Promise<TopicI>;
    findAll(): Promise<Array<Partial<TopicI>>>;
    findOne(id: number): Promise<TopicI>;
    findByUnit(id: number): Promise<Array<Partial<TopicI>>>;
}