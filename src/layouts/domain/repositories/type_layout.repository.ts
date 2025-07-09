import { TypeLayoutI } from "../entitiesI/TypeLayoutI";

export interface TypeLayoutRepository {
    create(name: string): Promise<TypeLayoutI>;
    findAll(): Promise<Array<TypeLayoutI>>;
}