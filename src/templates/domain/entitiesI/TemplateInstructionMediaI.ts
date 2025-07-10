import { TemplateI } from "./TemplateI";
import { TypeInstructionMediaI } from "./TypeInstructionMediaI";

export interface TemplateInstructionMediaI {
    template: TemplateI;
    typeMedia: TypeInstructionMediaI;
    pathMedia: string;
}