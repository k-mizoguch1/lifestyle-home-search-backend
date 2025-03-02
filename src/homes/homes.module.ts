import { Module } from '@nestjs/common';
import { HomesService } from './homes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Home } from './entities/home.entity';
import { HomesController } from './homes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Home])],
  providers: [HomesService],
  exports: [HomesService],
  controllers: [HomesController],
})
export class HomesModule {}
