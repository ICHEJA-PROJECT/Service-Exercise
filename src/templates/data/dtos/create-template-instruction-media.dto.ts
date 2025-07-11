import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTemplateInstructionMediaDto {
    @ApiProperty({description: "id of template", type: "number"})
    @IsNumber()
    template: number;
    @ApiProperty({description: "id of type media", type: "number"})
    @IsNumber()
    typeMedia: number;
    @ApiProperty({description: "path to the media (gif, img, etc)", type: "string"})
    @IsString()
    pathMedia: string;
}