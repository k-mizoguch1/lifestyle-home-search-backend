import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
import { Layout, BUILDING_TYPE } from './home.enum';

export class CreateHomeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  prefecture: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  rent: number;

  @IsNotEmpty()
  @IsEnum(Layout)
  layout: Layout;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsEnum(BUILDING_TYPE)
  building: BUILDING_TYPE;
}

export class UpdateHomeDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  prefecture: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsNumber()
  rent: number;

  @IsOptional()
  @IsEnum(Layout)
  layout: Layout;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsEnum(BUILDING_TYPE)
  building: BUILDING_TYPE;
}
