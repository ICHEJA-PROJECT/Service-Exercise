import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { LayoutRepository } from "src/layouts/domain/repositories/LayoutRepository";
import { LayoutEntity } from "../entities/layout.entity";
import { In, Repository } from "typeorm";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { CreateLayoutDto } from "../dtos/create-layout.dto";
import { TypeLayoutEntity } from "../entities/type_layout.entity";

@Injectable()
export class LayoutRepositoryImpl implements LayoutRepository {
    constructor(
        @Inject(LayoutEntity) private readonly layoutRepository: Repository<LayoutEntity>, 
        @Inject(TypeLayoutEntity) private readonly typeLayoutRepository: Repository<TypeLayoutEntity>
    ){}
    
    async create(createLayout: CreateLayoutDto): Promise<LayoutI> {
        try {
            const typeLayout = await this.typeLayoutRepository.findOne({where: { id: createLayout.type_layout_id }})
            if(!typeLayout) {
                throw new InternalServerErrorException("El tipo de vista no existe.")
            }
            const layoutSaved = this.layoutRepository.create({
                name: createLayout.name,
                typeLayout: typeLayout
            });

            return await this.layoutRepository.save(layoutSaved);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Array<LayoutI>> {
        try {
            const layouts = await this.layoutRepository.find();
            return layouts;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}