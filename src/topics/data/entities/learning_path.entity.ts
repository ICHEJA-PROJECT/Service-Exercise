import { LearningPathI } from "src/topics/domain/entititesI/LearningPathI";
import { TopicSequenceI } from "src/topics/domain/entititesI/TopicSequenceI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TopicSequenceEntity } from "./topic_sequence.entity";

@Entity('ruta_aprendizaje')
export class LearningPathEntity implements LearningPathI {
    @PrimaryGeneratedColumn('increment', {name: 'id_ruta_aprendizaje'})
    id: number;
    @Column({name: 'nombre', type: 'varchar', length: 64})
    name: string;
    @OneToMany(() => TopicSequenceEntity, topicSequence => topicSequence.learningPath)
    sequences: TopicSequenceI[];
}