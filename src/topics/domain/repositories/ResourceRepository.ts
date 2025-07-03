import { ResourceI } from "../entititesI/ResourceI";

export interface ResourceRepository {
    create(resource: ResourceI): Promise<ResourceI>;
    findByTopic(topic_id: number): Promise<Array<ResourceI>>;
}