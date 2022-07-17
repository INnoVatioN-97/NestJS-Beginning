import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// Spring에서의 @RequestMapping("/movies")와 동일
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  //index
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // pathVariable
  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
