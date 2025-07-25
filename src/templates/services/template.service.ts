import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TemplateRepositoryImpl } from '../data/repositories/template.repository.impl';
import { TemplateRepository } from '../domain/repositories/TemplateRepository';
import { CreateTemplateDto } from '../data/dtos/create-template.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TemplateService {
  constructor(
    @Inject(TemplateRepositoryImpl)
    private readonly templateRepository: TemplateRepository,
  ) {}

  async create(createTemplateDto: CreateTemplateDto) {
    try {
      const template = await this.templateRepository.create(createTemplateDto);
      return template;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopics(topicIds: number[]) {
    try {
      if (!topicIds || topicIds.length === 0) return [];
      const templates = await this.templateRepository.findByTopics(topicIds);
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTopic(topicId: number) {
    try {
      const template = await this.templateRepository.findByTopic(topicId);
      return template;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const templates = await this.templateRepository.findAll();
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findOne(id: number) {
    try {
      const template = await this.templateRepository.findOne(id);
      return template;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByIds(ids: number[]) {
        try {
      const templates = await this.templateRepository.findByIds(ids);
      return templates;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
