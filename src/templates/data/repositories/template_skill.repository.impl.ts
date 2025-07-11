import { TemplateSkillI } from "src/templates/domain/entitiesI/TemplateSkillI";
import { TemplateSkillRepository } from "src/templates/domain/repositories/TemplateSkillRepository";
import { CreateTemplateSkillDto } from "../dtos/create-template-skill.dto";
import { Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { TemplateSkillEntity } from "../entities/template_skill.entity";
import { Repository } from "typeorm";
import { SkillEntity } from "../entities/skill.entity";
import { TemplateEntity } from "../entities/template.entity";

@Injectable()
export class TemplateSkillRepositoryImpl implements TemplateSkillRepository {
    constructor(
        @Inject(TemplateSkillEntity) private readonly templateSkillRepository: Repository<TemplateSkillEntity>,
        @Inject(SkillEntity) private readonly skillRepository: Repository<SkillEntity>,
        @Inject(TemplateEntity) private readonly templateRepository: Repository<TemplateEntity>
    ) {}

    async create(createTemplateSkillDto: CreateTemplateSkillDto): Promise<TemplateSkillI> {
        try {
            const skill = await this.skillRepository.findOne({where: {id: createTemplateSkillDto.skill}});

            if(!skill) throw new NotFoundException("La habilidad seleccionada no existe.")

            const template = await this.templateRepository.findOne({where: {id: createTemplateSkillDto.template}});

            if(!template) throw new NotFoundException("El reactivo seleccionado no existe.")

            const templateSkill = this.templateSkillRepository.create({
                porcentage: createTemplateSkillDto.procentage,
                skill: skill,
                template: template
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
}