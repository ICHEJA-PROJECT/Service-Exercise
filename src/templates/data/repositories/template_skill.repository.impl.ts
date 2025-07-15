import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { TemplateSkillRepository } from "src/templates/domain/repositories/TemplateSkillRepository";
import { CreateTemplateSkillDto } from "../dtos/create-template-skill.dto";
import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TemplateSkillEntity } from "../entities/template_skill.entity";
import { In, Repository } from "typeorm";
import { SkillEntity } from "../entities/skill.entity";
import { TemplateEntity } from "../entities/template.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TemplateSkillRepositoryImpl implements TemplateSkillRepository {
    constructor(
        @InjectRepository(TemplateSkillEntity) private readonly templateSkillRepository: Repository<TemplateSkillEntity>,
        @InjectRepository(SkillEntity) private readonly skillRepository: Repository<SkillEntity>,
        @InjectRepository(TemplateEntity) private readonly templateRepository: Repository<TemplateEntity>
    ) {}

    async create(createTemplateSkillDto: CreateTemplateSkillDto): Promise<TemplateSkillI> {
        try {
            const skill = await this.skillRepository.findOne({where: {id: createTemplateSkillDto.skill}});

            if(!skill) throw new NotFoundException("La habilidad seleccionada no existe.")

            const template = await this.templateRepository.findOne({where: {id: createTemplateSkillDto.template}});

            if(!template) throw new NotFoundException("El reactivo seleccionado no existe.")

            const templateSkill = this.templateSkillRepository.create({
                porcentage: createTemplateSkillDto.porcentage,
                skill: skill,
                template: template,
                flag: createTemplateSkillDto.flag
            });

            return await this.templateSkillRepository.save(templateSkill);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<TemplateSkillI[]> {
        try {
            const templateSkills = await this.templateSkillRepository.find();
            return templateSkills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findManyByTemplates(templateIds: number[]): Promise<TemplateSkillI[]> {
        try {
            const templateSkils = await this.templateSkillRepository.find({where:{templateId:In(templateIds)}});
            return templateSkils;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}