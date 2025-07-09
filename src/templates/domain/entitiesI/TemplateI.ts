import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { TemplateInstructionMediaI } from "./TemplateInstructionMediaI";

export interface TemplateI {
    id: number;
    title: string;
    instructions: string;
    suggest_time: string;
    attributes: object;
    topic_id: TopicI;
    exercises: ExerciseI[];
    layout: LayoutI;
    instructionMedias: TemplateInstructionMediaI[];
}