import { UnitI } from "../entititesI/UnitI";

export interface UnitRepository {
    create(unit: UnitI): Promise<UnitI>;
}