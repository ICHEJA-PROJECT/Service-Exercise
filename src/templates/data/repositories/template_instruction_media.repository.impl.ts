import { TemplateInstructionMediaI } from 'src/templates/domain/entitiesI/TemplateInstructionMediaI';
import { TemplateInstructionMediaRepository } from 'src/templates/domain/repositories/TemplateInstructionMediaRepository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TemplateInstructionMediaEntity } from '../entities/template_instruction_media.entity';
import { Repository } from 'typeorm';
import { TemplateEntity } from '../entities/template.entity';
import { TypeInstructionMediaEntity } from '../entities/type_instruction_media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateInstructionMedia } from 'src/templates/domain/entities/TemplateInstructionMedia';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TemplateInstructionMediaRepositoryImpl
  implements TemplateInstructionMediaRepository
{
  constructor(
    @InjectRepository(TemplateInstructionMediaEntity)
    private readonly templateInstructinMediaRepository: Repository<TemplateInstructionMediaEntity>,
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    @InjectRepository(TypeInstructionMediaEntity)
    private readonly typeInstructionMediaRepository: Repository<TypeInstructionMediaEntity>,
  ) {}

  async create(
    templateInstructionMedia: TemplateInstructionMedia,
  ): Promise<TemplateInstructionMediaI> {
    try {
      const template = await this.templateRepository.findOne({
        where: { id: templateInstructionMedia.templateId },
      });

      if (!template) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El template seleccionado no existe.',
        });
      }

      const typeMedia = await this.typeInstructionMediaRepository.findOne({
        where: { id: templateInstructionMedia.typeMediaId },
      });

      if (!typeMedia) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El tipo de media seleccionado no existe.',
        });
      }

      const templateInstructionMediaSaved =
        this.templateInstructinMediaRepository.create({
          pathMedia: templateInstructionMedia.pathMedia,
          template: template,
          typeMedia: typeMedia,
        });

      return await this.templateInstructinMediaRepository.save(
        templateInstructionMediaSaved,
      );
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
  findAll(): Promise<TemplateInstructionMediaI[]> {
    try {
      const templateInstructionMedias =
        this.templateInstructinMediaRepository.find();
      return templateInstructionMedias;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
