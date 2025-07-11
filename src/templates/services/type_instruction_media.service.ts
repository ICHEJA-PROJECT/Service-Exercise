import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TypeInstructionMediaRepositoryImpl } from "../data/repositories/type_instruction_media.repository.impl";
import { TypeInstructionMediaRepository } from "../domain/repositories/TypeInstructionMediaRepository";
import { CreateTypeInstructionMediaDto } from "../data/dtos/create-type-instruction-media.dto";

@Injectable()
export class TypeInstructionMediaService {
    constructor(@Inject(TypeInstructionMediaRepositoryImpl) private readonly typeInstructionMediaRepository: TypeInstructionMediaRepository) {}

    async create(createTypeInstructionMediaDto: CreateTypeInstructionMediaDto) {
        try {
            const typeInstructionMedia = await this.typeInstructionMediaRepository.create(createTypeInstructionMediaDto);
            return typeInstructionMedia;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const typeInstructionMedias = await this.typeInstructionMediaRepository.findAll();
            return typeInstructionMedias;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}