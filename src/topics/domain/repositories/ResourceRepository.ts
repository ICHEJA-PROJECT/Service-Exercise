import { ResourceI } from "../entititesI/ResourceI";

export interface ResourceRepository {
    create(resource: keyof ResourceI): Promise<ResourceI>;
    findByTopic(topic_id: number): Promise<Array<ResourceI>>;
}