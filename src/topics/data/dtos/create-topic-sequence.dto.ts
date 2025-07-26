import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTopicSequenceDto {
    @ApiProperty({description: "id of current topic", type: "number"})
    @IsNumber()
    currentTopicId: number;
    @ApiProperty({description: "id of next topic", type: "number"})
    @IsNumber()
    nextTopicId: number;
    @ApiProperty({description: "id of learning path", type: "number"})
    @IsNumber()
    learningPathId: number;
}