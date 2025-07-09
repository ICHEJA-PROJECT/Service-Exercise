import { LayoutI } from "src/layouts/domain/entitiesI/LayoutI";
import { TypeLayoutI } from "src/layouts/domain/entitiesI/TypeLayoutI";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LayoutEntity } from "./layout.entity";

@Entity('Tipo_Layouts')
export class TypeLayoutEntity implements TypeLayoutI {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({name: "Nombre", type: "varchar", length: 64, nullable: false})
    name: string;
    @OneToMany(() => LayoutEntity, layout => layout.type_layout_id)
    layouts: LayoutI[];
}