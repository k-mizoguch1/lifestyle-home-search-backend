import {
  Controller,
  Post,
  Request,
  Body,
  Get,
  Put,
  Delete,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './boards.dto';
import { Public } from 'src/auth/public.decorator';
import { Response } from 'express';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Public()
  @Get(':id')
  findBoard(@Request() req) {
    if (!req.user) {
      return this.boardsService.findOneByID(req.params.id);
    }
    return this.boardsService.findOneByID(req.params.id, req.user.id);
  }

  @Get()
  findUserBoards(@Request() req) {
    return this.boardsService.findAllByUserId(req.user.id);
  }

  @Post()
  createBoard(@Request() req, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create({
      user_id: req.user.id,
      ...createBoardDto,
    });
  }

  @Put(':id')
  updateBoard(@Request() req, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(
      req.params.id,
      req.user.id,
      updateBoardDto,
    );
  }

  @Delete(':id')
  async deleteBoard(@Request() req, @Res() res: Response) {
    const isDeleted = await this.boardsService.delete(
      req.params.id,
      req.user.id,
    );
    if (!isDeleted) {
      throw new UnauthorizedException();
    }

    return res.status(204).send();
  }
}
