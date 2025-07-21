import { CreateTopicSequenceDto } from "src/topics/data/dtos/create-topic-sequence.dto";
import { TopicSequenceI } from "../entititesI/TopicSequenceI";

export interface TopicSequenceRepository {
    create(createTopicSequenceDto: CreateTopicSequenceDto): Promise<TopicSequenceI>;
    findAll(): Promise<TopicSequenceI[]>;
    findByLearningPath(learningPathId: number): Promise<TopicSequenceI[]>;    
}