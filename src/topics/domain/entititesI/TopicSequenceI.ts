import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { LearningPathI } from "./LearningPathI";

export interface TopicSequenceI {
    currentTopic: TopicI;
    nextTopic: TopicI;
    learningPath: LearningPathI;
}