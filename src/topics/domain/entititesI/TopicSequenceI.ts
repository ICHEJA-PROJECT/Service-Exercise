import { TopicI } from "src/topics/domain/entititesI/TopicI";

export interface TopicSequenceI {
    currentTopic: TopicI;
    nextTopic: TopicI;
}