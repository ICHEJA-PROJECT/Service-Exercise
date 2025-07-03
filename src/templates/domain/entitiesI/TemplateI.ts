import { ExerciseI } from "src/exercises/domain/entitiesI/ExerciseI";
import { TopicI } from "src/topics/domain/entititesI/TopicI";

export interface TemplateI {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    suggest_time: string;
    topic_id: TopicI;
    exercises: ExerciseI[];
}