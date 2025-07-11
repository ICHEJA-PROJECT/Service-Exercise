import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TemplateInstructionMediaRepositoryImpl } from "../data/repositories/template_instruction_media.repository.impl";
import { TemplateInstructionMediaRepository } from "../domain/repositories/TemplateInstructionMediaRepository";
import { CreateTemplateInstructionMediaDto } from "../data/dtos/create-template-instruction-media.dto";

@Injectable()
export class TemplateInstructionMediaService {
    constructor(@Inject(TemplateInstructionMediaRepositoryImpl) private readonly templateInstructionMediaRepository: TemplateInstructionMediaRepository) {}

    async create(createTemplateInstructionMediaDto: CreateTemplateInstructionMediaDto) {
        try {
            const templateInstructionMedia = await this.templateInstructionMediaRepository.create(createTemplateInstructionMediaDto);
            return templateInstructionMedia;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const templateInstructionMedias = await this.templateInstructionMediaRepository.findAll();
            return templateInstructionMedias;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}