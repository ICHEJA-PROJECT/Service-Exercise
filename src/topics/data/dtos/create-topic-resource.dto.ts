import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateTopicResourceDto {
    @ApiProperty({ description: 'id of topic'})
    @IsNumber()
    topic_id: number;
    @ApiProperty({ description: 'id of resource'})
    @IsNumber()
    resource_id: number;
}