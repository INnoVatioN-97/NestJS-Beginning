import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  // 배열의 경우 각각의 요소가 문자열인지 검사
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
