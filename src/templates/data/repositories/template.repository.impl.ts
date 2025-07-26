import { HttpStatus, Injectable } from '@nestjs/common';
import { TemplateI } from 'src/templates/domain/entitiesI/TemplateI';
import { TemplateRepository } from 'src/templates/domain/repositories/TemplateRepository';
import { TemplateEntity } from '../entities/template.entity';
import { In, Repository } from 'typeorm';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { TopicEntity } from 'src/topics/data/entities/topic.entity';
import { LayoutEntity } from 'src/layouts/data/entities/layout.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TemplateRepositoryImpl implements TemplateRepository {
  constructor(
    @InjectRepository(TemplateEntity)
    private readonly templateRepository: Repository<TemplateEntity>,
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(LayoutEntity)
    private readonly layoutRepository: Repository<LayoutEntity>,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<TemplateI> {
    try {
      const topic = await this.topicRepository.findOne({
        where: { id: createTemplateDto.topic },
      });

      if (!topic) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El tema seleccionado no existe.',
        });
      }

      const layout = await this.layoutRepository.findOne({
        where: { id: createTemplateDto.layout },
      });

      if (!layout) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'La vista seleccionada no existe.',
        });
      }

      const template = this.templateRepository.create({
        title: createTemplateDto.title,
        instructions: createTemplateDto.instructions,
        suggestTime: createTemplateDto.suggestTime,
        topic: topic,
        layout: layout,
      });

      return await this.templateRepository.save(template);
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll(): Promise<TemplateI[]> {
    try {
      const templates = await this.templateRepository.find({
        relations: { layout: true, skills: true },
      });
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number): Promise<TemplateI> {
    try {
      const template = await this.templateRepository.findOne({
        where: { id: id },
        relations: { layout: true, skills: true },
      });
      if (!template) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'El reactivo solicitado no existe.',
        });
      }
      return template;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopics(topicIds: number[]): Promise<TemplateI[]> {
    try {
      const templates = await this.templateRepository.find({
        where: { topic: In(topicIds) },
        select: { skills: true },
      });
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopic(topicId: number): Promise<TemplateI[]> {
    try {
      const templates = await this.templateRepository.find({
        where: { topic: { id: topicId } },
      });
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByIds(ids: number[]): Promise<TemplateI[]> {
      try {
        const templates = await this.templateRepository.find({where:{id: In(ids)}, select: {id: true, title: true}});
        return templates;
      } catch (error) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: error.message,
        });
      }
  }
}
