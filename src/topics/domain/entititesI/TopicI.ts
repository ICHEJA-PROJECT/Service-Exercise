import { TemplateI } from "src/templates/domain/entitiesI/TemplateI";
import { ResourceI } from "./ResourceI";

export interface TopicI {
    id: number;
    name: string;
    resources: ResourceI[];
    templates: TemplateI[];
    nextTopics: TopicI[];
    previousTopics: TopicI[];
}