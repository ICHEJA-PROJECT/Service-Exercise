import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { TemplateInstructionMediaI } from "./TemplateInstructionMediaI";
import { TemplateSkillI } from "./TemplateSkillI";

export interface TemplateI {
    id: number;
    title: string;
    instructions: string;
    suggestTime: string;
    topic: TopicI;
    exercises: ExerciseI[];
    layout: LayoutI;
    instructionMedias: TemplateInstructionMediaI[];
    skills: TemplateSkillI[];
}