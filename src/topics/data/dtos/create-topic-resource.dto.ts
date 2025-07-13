import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTopicResourceDto {
    @ApiProperty({description: "Id of topic", type: "number"})
    @IsNumber()
    topicId: number;
    @ApiProperty({description: "Id of resource", type: "number"})
    @IsNumber()
    resourceId: number;
}