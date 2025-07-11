import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LayoutService } from "../services/layout.service";
import { CreateLayoutDto } from "../data/dtos/create-layout.dto";

@Controller('layouts')
export class LayoutController {
    constructor(private readonly layoutService: LayoutService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLayoutDto: CreateLayoutDto) {
        return await this.layoutService.create(createLayoutDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.layoutService.findAll();
    }
}