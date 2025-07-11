import { CreateUnitDto } from "src/topics/data/dtos/create-unit.dto";
import { UnitI } from "../entititesI/UnitI";

export interface UnitRepository {
    create(createUnit: CreateUnitDto): Promise<UnitI>;
    findAll(): Promise<UnitI[]>;
}