import { TypeInstructionMediaI } from "../entitiesI/TypeInstructionMediaI";

export interface TypeInstructionMediaRepository {
    create(type_instruction_media: keyof TypeInstructionMediaI): Promise<TypeInstructionMediaI>;
    findAll(): Promise<Array<TypeInstructionMediaI>>;
}