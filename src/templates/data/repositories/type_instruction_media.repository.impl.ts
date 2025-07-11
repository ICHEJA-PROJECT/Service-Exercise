import { TypeInstructionMediaI } from "src/templates/domain/entitiesI/TypeInstructionMediaI";
import { TypeInstructionMediaRepository } from "src/templates/domain/repositories/TypeInstructionMediaRepository";
import { CreateTypeInstructionMediaDto } from "../dtos/create-type-instruction-media.dto";
import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TypeInstructionMediaEntity } from "../entities/type_instruction_media.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeInstructionMediaRepositoryImpl implements TypeInstructionMediaRepository {
    constructor(@Inject(TypeInstructionMediaEntity) private readonly typeInstructionMediaRepository: Repository<TypeInstructionMediaEntity>) {}

    async create(createTypeInstructionMediaDto: CreateTypeInstructionMediaDto): Promise<TypeInstructionMediaI> {
        try {
            const type = this.typeInstructionMediaRepository.create(createTypeInstructionMediaDto);
            return await this.typeInstructionMediaRepository.save(type);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<TypeInstructionMediaI[]> {
        try {
            const types = await this.typeInstructionMediaRepository.find();
            return types;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}