import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { TemplateSkillRepositoryImpl } from "../data/repositories/template_skill.repository.impl";
import { TemplateSkillRepository } from "../domain/repositories/TemplateSkillRepository";
import { CreateTemplateSkillDto } from "../data/dtos/create-template-skill.dto";

@Injectable()
export class TemplateSkillService {
    constructor(@Inject(TemplateSkillRepositoryImpl) private readonly templateSkillRepository: TemplateSkillRepository) {}

    async create(createTemplateSkillDto: CreateTemplateSkillDto) {
        try {
            const templateSkill = await this.templateSkillRepository.create(createTemplateSkillDto);
            return templateSkill;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll() {
        try {
            const templateSkills = await this.templateSkillRepository.findAll();
            return templateSkills;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}