
import { TopicI } from "src/topics/domain/entititesI/TopicI";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { TopicSequenceI } from "src/topics/domain/entititesI/TopicSequenceI";
import { LearningPathI } from "src/topics/domain/entititesI/LearningPathI";
import { LearningPathEntity } from "./learning_path.entity";

@Entity('secuencia_temas')
export class TopicSequenceEntity implements TopicSequenceI {
    @PrimaryColumn({ name: "id_tema", type: "int", nullable: false})
    currentTopicId: number;

    @PrimaryColumn({ name: "id_tema_siguiente", type: "int", nullable: false})
    nextTopicId: number;

    @ManyToOne(() => TopicEntity, topic => topic.nextTopics)
    @JoinColumn({name: "id_tema"})
    currentTopic: TopicI;

    @ManyToOne(() => TopicEntity, topic => topic.previousTopics)
    @JoinColumn({name: "id_tema_siguiente"})
    nextTopic: TopicI;

    @ManyToOne(() => LearningPathEntity, learningPath => learningPath.sequences)
    @JoinColumn({ name: "id_ruta_aprendizaje" })
    learningPath: LearningPathI;
}