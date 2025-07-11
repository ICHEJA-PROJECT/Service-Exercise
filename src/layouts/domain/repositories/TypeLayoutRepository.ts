import { CreateTypeLayoutDto } from "src/layouts/data/dtos/create-type-layout.dto";
import { TypeLayoutI } from "../entitiesI/TypeLayoutI";

export interface TypeLayoutRepository {
    create(createTypeLayoutDto: CreateTypeLayoutDto): Promise<TypeLayoutI>;
    findAll(): Promise<Array<TypeLayoutI>>;
}