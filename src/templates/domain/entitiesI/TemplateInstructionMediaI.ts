import { TemplateI } from "./TemplateI";
import { TypeInstructionMediaI } from "./TypeInstructionMediaI";

export interface TemplateInstructionMediaI {
    template_id: TemplateI;
    type_media_id: TypeInstructionMediaI;
    path_media: string;
}