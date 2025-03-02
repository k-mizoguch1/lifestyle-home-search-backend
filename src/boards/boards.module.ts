import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  exports: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
