import { UnitI } from "../entititesI/UnitI";

export interface UnitRepository {
    create(unit: keyof UnitI): Promise<UnitI>;
}