import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CreateTemplateDto {
    @ApiProperty({ description: 'title of template', type: "string"})
    @IsString()
    title: string;
    @ApiProperty({ description: 'instruction of template', type: "string"})
    @IsString()
    instructions: string;
    @ApiProperty({ description: 'suggest time to complete template', type: "string"})
    @IsString()
    suggestTime: string;
    @ApiProperty({ description: "id of layout to template", type: "number"})
    @IsNumber()
    layout: number;
    @ApiProperty({ description: 'id of topic which belong it'})
    @IsNumber()
    topic: number;
}