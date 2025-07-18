import { SkillI } from "src/templates/domain/entitiesI/SkillI";
import { SkillRepository } from "src/templates/domain/repositories/SkillRepository";
import { CreateSkillDto } from "../dtos/create-skill.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SkillEntity } from "../entities/skill.entity";
import { In, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SkillRepositoryImpl implements SkillRepository {
    constructor(@InjectRepository(SkillEntity) private readonly skillRepository: Repository<SkillEntity>) {}

    async create(createSkillDto: CreateSkillDto): Promise<SkillI> {
        try {
            const skill = this.skillRepository.create(createSkillDto);
            return await this.skillRepository.save(skill);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<SkillI[]> {
        try {
            const skills = await this.skillRepository.find();
            return skills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findByTemplates(templateIds: number[]): Promise<SkillI[]> {
        try {
            const skills = await this.skillRepository.find({ where: {templates: {template: {id: In(templateIds)}}}});
            return skills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}