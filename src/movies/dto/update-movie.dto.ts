import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

// 이렇게도 할 수 있지만 partial type을 적용하면 저렇게도 할 수 있다.
// export class UpdateMovieDto {
//   @IsString()
//   readonly title?: string;
//   @IsNumber()
//   readonly year?: number;
//   // 배열의 경우 각각의 요소가 문자열인지 검사
//   @IsString({ each: true })
//   readonly genres?: string[];
// }

/**
 * Partial Type이 적용된 UpdateMovieDto.
 * 기본적으로 CreateMovieDto와 동일한 값을 가지고 있는데, 모든 필드가 필수사항이 아니도록 만들어진다.
 * = 위에 적은거랑 동일한 기능
 */
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
