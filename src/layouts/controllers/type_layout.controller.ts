import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { TypeLayoutService } from "../services/type_layout.service";
import { CreateTypeLayoutDto } from "../data/dtos/create-type-layout.dto";

@Controller('layouts/types')
export class TypeLayoutController {
    constructor(private readonly typeLayoutService: TypeLayoutService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createTypeLayoutDto: CreateTypeLayoutDto) {
        return await this.typeLayoutService.create(createTypeLayoutDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.typeLayoutService.findAll();
    }

}