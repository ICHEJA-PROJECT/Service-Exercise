import { TemplateSkillI } from "./TemplateSkillI";

export interface SkillI {
    id: number;
    name: string;
    templates: TemplateSkillI[];
}