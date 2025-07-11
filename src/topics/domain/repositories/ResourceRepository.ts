import { CreateResourceDto } from "src/topics/data/dtos/create-resource.dto";
import { ResourceI } from "../entititesI/ResourceI";

export interface ResourceRepository {
    create(createResource: CreateResourceDto): Promise<ResourceI>;
    findOne(id: number): Promise<ResourceI>;
    findAll(): Promise<ResourceI[]>;
    findByTopic(idTopic: number): Promise<ResourceI[]>;
    findByTopics(idTopics: number[]): Promise<ResourceI[]>;
}