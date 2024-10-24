import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class PageNumberDto {
  @IsInt()
  page: number;
}

export class SelectedOptionDto {
  @IsNumber()
  id: number;
}

export class PollDto {
  @IsString()
  title: string;

  @IsString({ each: true })
  options: string[];
}

export class PageDto {
  @IsNumber()
  @IsOptional()
  page?: number;
}
