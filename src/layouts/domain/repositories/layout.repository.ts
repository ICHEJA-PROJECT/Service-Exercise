import { CreateLayoutDto } from "src/layouts/data/dtos/create-layout.dto";
import { LayoutI } from "../entitiesI/LayoutI";

export interface LayoutRepository {
    create(createLayout: CreateLayoutDto): Promise<LayoutI>;
    findAll(): Promise<Array<LayoutI>>;
}