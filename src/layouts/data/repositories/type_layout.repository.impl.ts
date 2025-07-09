import { Inject, InternalServerErrorException } from "@nestjs/common";
import { TypeLayoutI } from "src/layouts/domain/entitiesI/TypeLayoutI";
import { TypeLayoutRepository } from "src/layouts/domain/repositories/type_layout.repository";
import { Repository } from "typeorm";
import { TypeLayoutEntity } from "../entities/type_layout.entity";

export class TypeLayoutRepositoryImpl implements TypeLayoutRepository {
    constructor(@Inject(TypeLayoutEntity) private readonly typeLayoutRepository: Repository<TypeLayoutEntity>) {}

    async create(name: string): Promise<TypeLayoutI> {
        try {
            const typeLayoutSaved = this.typeLayoutRepository.create({name});
            return await this.typeLayoutRepository.save(typeLayoutSaved);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Array<TypeLayoutI>> {
        try {
            const typeLayouts = await this.typeLayoutRepository.find();
            return typeLayouts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    
}