import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visibility } from './visibility.enum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async findOneByID(
    board_id: number,
    login_user_id: number = null,
  ): Promise<Board | null> {
    const board = await this.boardsRepository.findOne({
      where: { id: board_id },
    });

    if (!board) {
      return null;
    }

    if (board.visibility === Visibility.PUBLIC) {
      return board;
    }

    if (board.user_id !== login_user_id) {
      throw new UnauthorizedException();
    }

    return board;
  }

  async findAllByUserId(user_id: number): Promise<Board[]> {
    return await this.boardsRepository.find({
      where: { user_id: user_id },
      order: { created_at: 'ASC' },
    });
  }

  async create(board: Partial<Board>): Promise<Board> {
    return await this.boardsRepository.save(board);
  }

  async update(
    board_id: number,
    user_id: number,
    updateBoardDto: Partial<Board>,
  ): Promise<Board> {
    const updatedBoard = await this.boardsRepository.update(
      { id: board_id, user_id: user_id },
      updateBoardDto,
    );

    if (!updatedBoard.affected) {
      throw new UnauthorizedException();
    }

    return await this.boardsRepository.findOneBy({ id: board_id });
  }

  async delete(board_id: number, user_id: number): Promise<boolean> {
    const deletedBoard = await this.boardsRepository.delete({
      id: board_id,
      user_id: user_id,
    });

    if (!deletedBoard.affected) {
      return false;
    }

    return true;
  }
}
