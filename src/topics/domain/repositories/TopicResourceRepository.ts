import { TopicResourceI } from "../entititesI/TopicResourceI";

export interface TopicResourceRepository {
    create(topicResource: TopicResourceI): Promise<TopicResourceI>;
}