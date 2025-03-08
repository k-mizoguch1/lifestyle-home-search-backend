import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Home } from './entities/home.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  // LessThanOrEqual,
  // MoreThanOrEqual,
  Between,
  In,
} from 'typeorm';
import { Layout, BUILDING_TYPE } from './home.enum';

@Injectable()
export class HomesService {
  constructor(
    @InjectRepository(Home)
    private homesRepository: Repository<Home>,
  ) {}

  async findOneByID(home_id: number): Promise<Home | null> {
    const board = await this.homesRepository.findOne({
      where: { id: home_id },
    });

    if (!board) {
      return null;
    }

    return board;
  }

  async findAllByParam(
    cities?: string[],
    max_rent?: number,
    min_rent?: number,
    layouts?: Layout[],
    year?: number,
    buildings?: BUILDING_TYPE[],
  ): Promise<Home[]> {
    console.log(cities, max_rent, min_rent, layouts, year, buildings);
    console.log(max_rent !== undefined && max_rent !== null && min_rent !== undefined && min_rent !== null)
    const where: any = {};

    if (cities) where.city = In(cities);
    // if (max_rent !== undefined) where.rent = LessThanOrEqual(max_rent);
    // if (min_rent !== undefined) where.rent = MoreThanOrEqual(min_rent);
    if (max_rent !== undefined && max_rent !== null && min_rent !== undefined && min_rent !== null) {
        where.rent = Between(min_rent, max_rent);
    }
    if (layouts) where.layout = In(layouts);
    // under yera
    if (year) where.year = Between(0, year);
    // if (year !== undefined) where.year = year;
    if (buildings) where.building = In(buildings);

    return await this.homesRepository.find({
      // where: {
      //   city: In(cities),
      //   rent: max_rent ? LessThanOrEqual(max_rent) : MoreThanOrEqual(min_rent),
      //   layout: In(layouts),
      //   year: year,
      //   building: In(buildings),
      // },
      where,
      order: { created_at: 'ASC' },
    });
  }

  async create(home: Partial<Home>): Promise<Home> {
    return await this.homesRepository.save(home);
  }

  async update(home_id: number, updateHomeDto: Partial<Home>): Promise<Home> {
    const updatedBoard = await this.homesRepository.update(
      {
        id: home_id,
      },
      updateHomeDto,
    );

    if (!updatedBoard.affected) {
      throw new UnauthorizedException();
    }

    return await this.homesRepository.findOneBy({ id: home_id });
  }

  async delete(home_id: number): Promise<boolean> {
    const deletedBoard = await this.homesRepository.delete({ id: home_id });

    if (!deletedBoard.affected) {
      return false;
    }

    return true;
  }
}
