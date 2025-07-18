import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TemplateSkillRepositoryImpl } from '../data/repositories/template_skill.repository.impl';
import { TemplateSkillRepository } from '../domain/repositories/TemplateSkillRepository';
import { CreateTemplateSkillDto } from '../data/dtos/create-template-skill.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TemplateSkillService {
  constructor(
    @Inject(TemplateSkillRepositoryImpl)
    private readonly templateSkillRepository: TemplateSkillRepository,
  ) {}

  async create(createTemplateSkillDto: CreateTemplateSkillDto) {
    try {
      const templateSkill = await this.templateSkillRepository.create(
        createTemplateSkillDto,
      );
      return templateSkill;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const templateSkills = await this.templateSkillRepository.findAll();
      return templateSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findManyByTemplates(templateIds: number[]) {
    try {
      const templateSkills =
        await this.templateSkillRepository.findManyByTemplates(templateIds);
      return templateSkills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
