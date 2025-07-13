import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TypeInstructionMediaService } from "../services/type_instruction_media.service";
import { CreateTypeInstructionMediaDto } from "../data/dtos/create-type-instruction-media.dto";

@Controller('instructions-medias-types')
export class TypeInstructionMediaController {
    constructor(private readonly typeInstructionMediaService: TypeInstructionMediaService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTypeInstructionMediaDto: CreateTypeInstructionMediaDto){
        return await this.typeInstructionMediaService.create(createTypeInstructionMediaDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.typeInstructionMediaService.findAll();
    }

}