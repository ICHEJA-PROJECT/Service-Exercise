import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UnitRepositoryImpl } from "../data/repositories/unit.repository.impl";
import { UnitRepository } from "../domain/repositories/UnitRepository";
import { CreateUnitDto } from "../data/dtos/create-unit.dto";

@Injectable()
export class UnitService {
    constructor(@Inject(UnitRepositoryImpl) private readonly unitRepository: UnitRepository) {}

    async create(createUnitDto: CreateUnitDto) {
        try {
            const unit = await this.unitRepository.create(createUnitDto);
            return unit;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const units = await this.unitRepository.findAll();
            return units;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}