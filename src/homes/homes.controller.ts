import {
  Controller,
  Post,
  Request,
  Query,
  Body,
  Get,
  Put,
  Delete,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { HomesService } from './homes.service';
import { CreateHomeDto, UpdateHomeDto } from './homes.dto';
import { Layout, BUILDING_TYPE } from './home.enum';
import { Public } from 'src/auth/public.decorator';
import { Response } from 'express';

@Controller('homes')
export class HomesController {
  constructor(private homesService: HomesService) {}

  @Public()
  @Get(':id')
  findBoard(@Request() req) {
    return this.homesService.findOneByID(req.params.id);
  }

  @Get()
  findHomes(
    @Query('cities') cities?: string | string[],
    @Query('max_rent') max_rent?: string,
    @Query('min_rent') min_rent?: string,
    @Query('layouts') layouts?: string | string[],
    @Query('year') year?: string,
    @Query('buildings') buildings?: string | string[],
  ) {
    return this.homesService.findAllByParam(
      cities ? (Array.isArray(cities) ? cities : cities.split(',')) : undefined,
      max_rent && !isNaN(parseInt(max_rent)) ? parseInt(max_rent) : undefined,
      min_rent && !isNaN(parseInt(min_rent)) ? parseInt(min_rent) : undefined,
      layouts
        ? Array.isArray(layouts)
          ? layouts.map((l) => l as Layout)
          : layouts.split(',').map((l) => l as Layout)
        : undefined,
      year && !isNaN(parseInt(year)) ? parseInt(year) : undefined,
      buildings
        ? Array.isArray(buildings)
          ? buildings.map((b) => b as BUILDING_TYPE)
          : buildings.split(',').map((b) => b as BUILDING_TYPE)
        : undefined,
    );
  }

  @Post()
  createBoard(@Body() createHomeDto: CreateHomeDto) {
    return this.homesService.create({
      ...createHomeDto,
    });
  }

  @Put()
  updateBoard(@Request() req, @Body() updateHomeDto: UpdateHomeDto) {
    return this.homesService.update(req.params.id, updateHomeDto);
  }

  @Delete(':id')
  async deleteBoard(@Request() req, @Res() res: Response) {
    const isDeleted = await this.homesService.delete(req.params.id);
    if (!isDeleted) {
      throw new UnauthorizedException();
    }

    return res.status(204).send();
  }
}
