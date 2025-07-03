import { ResourceI } from "../entititesI/ResourceI";

export interface ResourceRepository {
    create(resource: keyof ResourceI): Promise<ResourceI>;
    findOne(id: number): Promise<ResourceI>;
}