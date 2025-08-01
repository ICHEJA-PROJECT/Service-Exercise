import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SkillRepositoryImpl } from '../data/repositories/skill.repository.impl';
import { SkillRepository } from '../domain/repositories/SkillRepository';
import { CreateSkillDto } from '../data/dtos/create-skill.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class SkillService {
  constructor(
    @Inject(SkillRepositoryImpl)
    private readonly skillRepository: SkillRepository,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    try {
      const skill = await this.skillRepository.create(createSkillDto);
      return skill;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findAll() {
    try {
      const skills = await this.skillRepository.findAll();
      return skills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  async findByTemplates(templateIds: number[]) {
    try {
      if (!templateIds || templateIds.length === 0) {
        return [];
      }
      const skills = await this.skillRepository.findByTemplates(templateIds);
      return skills;
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }
}
