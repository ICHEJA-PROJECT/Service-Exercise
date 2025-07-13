export class TemplateInstructionMedia {
    pathMedia: string;
    templateId: number;
    typeMediaId: number;

    constructor(pathMedia: string, templateId: number, typeMediaId: number) {
        this.pathMedia =  pathMedia;
        this.templateId = templateId;
        this.typeMediaId = typeMediaId;
    }
}