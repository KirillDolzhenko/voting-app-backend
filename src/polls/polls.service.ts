import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PollDto, SelectedOptionDto } from './dto/polls.dto';
import { selectOption } from './select/db.select';

@Injectable()
export class PollsService {
  constructor(private readonly db: DbService) {}

  async getAll() {
    try {
      let polls = await this.db.poll.findMany({
        where: {},
        include: {
          options: {
            select: {
              ...selectOption,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      });

      return polls;
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async setVote(id: number, idPoll: number) {
    try {
      let votePollId = await this.db.option.findUnique({
        where: {
          id,
        },
        select: {
          pollId: true,
        },
      });

      if (votePollId.pollId === idPoll) {
        let vote = await this.db.option.update({
          where: {
            id,
          },
          data: {
            votes: {
              increment: 1,
            },
          },
        });

        return vote;
      }

      return new ForbiddenException('Этот вариант не относится к данному опросу');
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  async postPoll(dto: PollDto) {
    try {
      let number = dto.options.length;

      let poll = await this.db.poll.create({
        data: {
          title: dto.title,
          options: {
            createMany: {
              data: dto.options.map((el) => ({
                text: el,
              })),
            },
          },
        },
        include: {
          options: {
            select: {
              ...selectOption,
            },
          },
        },
      });

      return poll;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }
  }

  async deletePoll(id: number) {
    try {
      let poll = this.db.poll.delete({
        where: {
          id,
        },
      });

      return poll;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException();
    }
  }
}
