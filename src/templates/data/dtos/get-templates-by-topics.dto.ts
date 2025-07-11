import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class GetTemplatesByTopicsDto {
    @ApiProperty({description: "array with topic ids", type: [Number]})
    @IsArray()
    topicIds: number[];
}