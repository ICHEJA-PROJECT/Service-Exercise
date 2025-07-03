import { TopicI } from "../entititesI/TopicI";

export interface TopicRepository {
    create(topic: TopicI): Promise<TopicI>;
    findAll(): Promise<Array<TopicI>>;
    findOne(id: number): Promise<TopicI>;
}