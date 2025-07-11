import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UnitService } from "../services/unit.service";
import { CreateUnitDto } from "../data/dtos/create-unit.dto";

@Controller('units')
export class UnitController {
    constructor(private readonly unitService: UnitService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createUnitDto: CreateUnitDto) {
        return await this.unitService.create(createUnitDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getAll() {
        return await this.unitService.findAll();
    }
}