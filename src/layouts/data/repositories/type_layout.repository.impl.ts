import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TypeLayoutI } from "src/layouts/domain/entitiesI/TypeLayoutI";
import { TypeLayoutRepository } from "src/layouts/domain/repositories/TypeLayoutRepository";
import { Repository } from "typeorm";
import { TypeLayoutEntity } from "../entities/type_layout.entity";
import { CreateTypeLayoutDto } from "../dtos/create-type-layout.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TypeLayoutRepositoryImpl implements TypeLayoutRepository {
    constructor(@InjectRepository(TypeLayoutEntity) private readonly typeLayoutRepository: Repository<TypeLayoutEntity>) {}

    async create(createTypeLayoutDto: CreateTypeLayoutDto): Promise<TypeLayoutI> {
        try {
            const typeLayoutSaved = this.typeLayoutRepository.create(createTypeLayoutDto);
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