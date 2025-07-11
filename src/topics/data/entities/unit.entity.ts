import { UnitI } from "src/topics/domain/entititesI/UnitI";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { TopicI } from "src/topics/domain/entititesI/TopicI";

@Entity('unidad')
export class UnitEntity implements UnitI {
    @PrimaryGeneratedColumn('increment', { name: "id_unidad"})
    id: number;
    @Column({ name: "nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @OneToMany(
        () => TopicEntity,
        topic => topic.unit
    )
    topics: TopicI[];
}