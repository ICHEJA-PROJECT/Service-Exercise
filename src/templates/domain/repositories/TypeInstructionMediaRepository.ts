import { CreateTypeInstructionMediaDto } from "src/templates/data/dtos/create-type-instruction-media.dto";
import { TypeInstructionMediaI } from "../entitiesI/TypeInstructionMediaI";

export interface TypeInstructionMediaRepository {
    create(createTypeInstructionMediaDto: CreateTypeInstructionMediaDto): Promise<TypeInstructionMediaI>;
    findAll(): Promise<TypeInstructionMediaI[]>;
}