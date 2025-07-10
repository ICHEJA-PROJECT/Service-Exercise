import { SkillI } from "./SkillI";
import { TemplateI } from "./TemplateI";

export interface TemplateSkillI {
    template: TemplateI;
    skill: SkillI;
    porcentage: number;
}