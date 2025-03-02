import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Visibility } from './visibility.enum';

export class CreateBoardDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Visibility)
  visibility: Visibility;
}

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsEnum(Visibility)
  visibility: Visibility;
}
