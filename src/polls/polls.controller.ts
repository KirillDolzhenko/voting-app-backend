import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { PollsService } from './polls.service';
import { PollDto, SelectedOptionDto } from './dto/polls.dto';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get()
  async getMany(@Query('page') page: number) {
    return await this.pollsService.getMany(page);
  }

  @Post()
  async postOne(@Body() dto: PollDto) {
    return await this.pollsService.postPoll(dto);
  }

  @Post(':id/vote')
  async update(@Param('id') id: string, @Body() dto: SelectedOptionDto) {
    return await this.pollsService.setVote(dto.id, Number(id));
  }

  @Delete(':id')
  async findOne(@Param('id') id: string) {
    return await this.pollsService.deletePoll(Number(id));
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.pollsService.getOne(Number(id));
  }
}
