import { UnitI } from "src/topics/domain/entititesI/UnitI";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TopicEntity } from "./topic.entity";
import { TopicI } from "src/topics/domain/entititesI/TopicI";

@Entity('Unidad')
export class UnitEntity implements UnitI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ name: "Nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @OneToMany(
        () => TopicEntity,
        topic => topic.unit_id
    )
    topics: TopicI[];
}