import { ResourceI } from "../entititesI/ResourceI";

export interface ResourceRepository {
    create(resource: ResourceI): Promise<ResourceI>;
    findOne(id: number): Promise<ResourceI>;
}