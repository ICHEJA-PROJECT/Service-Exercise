import { TopicI } from "../entititesI/TopicI";

export interface TopicRepository {
    create(topic: keyof TopicI): Promise<TopicI>;
    findAll(): Promise<Array<TopicI>>;
    findOne(id: number): Promise<TopicI>;
}