import { TopicSequenceI } from "./TopicSequenceI";

export interface LearningPathI {
    id: number;
    name: string;
    sequences: TopicSequenceI[];
}