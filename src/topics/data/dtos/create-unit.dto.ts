import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUnitDto {
    @ApiProperty({ description: 'Name of Unit'})
    @IsString()
    name: string;
}