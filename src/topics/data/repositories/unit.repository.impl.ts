import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UnitI } from "src/topics/domain/entititesI/UnitI";
import { UnitRepository } from "src/topics/domain/repositories/UnitRepository";
import { UnitEntity } from "../entities/unit.entity";
import { Repository } from "typeorm";
import { CreateUnitDto } from "../dtos/create-unit.dto";

@Injectable()
export class UnitRepositoryImpl implements UnitRepository {
    constructor(@Inject(UnitEntity) private readonly unitRepository: Repository<UnitEntity>) {}

    async create(createUnit: CreateUnitDto): Promise<UnitI> {
        try {
            const unit = this.unitRepository.create({name: createUnit.name});
            return await this.unitRepository.save(unit);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<UnitI[]> {
        try {
            const units = await this.unitRepository.find();
            return units;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}