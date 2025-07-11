import { TemplateInstructionMediaI } from "src/templates/domain/entitiesI/TemplateInstructionMediaI";
import { TemplateInstructionMediaRepository } from "src/templates/domain/repositories/TemplateInstructionMediaRepository";
import { CreateTemplateInstructionMediaDto } from "../dtos/create-template-instruction-media.dto";
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TemplateInstructionMediaEntity } from "../entities/template_instruction_media.entity";
import { Repository } from "typeorm";
import { TemplateEntity } from "../entities/template.entity";
import { TypeInstructionMediaEntity } from "../entities/type_instruction_media.entity";

@Injectable()
export class TemplateInstructionMediaRepositoryImpl implements TemplateInstructionMediaRepository {
    constructor(
        @Inject(TemplateInstructionMediaEntity) private readonly templateInstructinMediaRepository: Repository<TemplateInstructionMediaEntity>,
        @Inject(TemplateEntity) private readonly templateRepository: Repository<TemplateEntity>,
        @Inject(TypeInstructionMediaEntity) private readonly typeInstructionMediaRepository: Repository<TypeInstructionMediaEntity>
    ){}

    async create(createTemplateInstructionMediaDto: CreateTemplateInstructionMediaDto): Promise<TemplateInstructionMediaI> {
        try {
            
            const template = await this.templateRepository.findOne({where: {id: createTemplateInstructionMediaDto.template}});
            
            if(!template) throw new NotFoundException("El template seleccionado no existe.");

            const typeMedia = await this.typeInstructionMediaRepository.findOne({where: {id: createTemplateInstructionMediaDto.typeMedia}});

            if(!typeMedia) throw new NotFoundException("El tipo de media seleccionado no existe.");

            const templateInstructionMedia = this.templateInstructinMediaRepository.create({
                pathMedia: createTemplateInstructionMediaDto.pathMedia, 
                template: template,
                typeMedia: typeMedia
            });

            return await this.templateInstructinMediaRepository.save(templateInstructionMedia);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    findAll(): Promise<TemplateInstructionMediaI[]> {
        try {
            const templateInstructionMedias = this.templateInstructinMediaRepository.find();
            return templateInstructionMedias;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}