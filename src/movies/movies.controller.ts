import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

// Spring에서의 @RequestMapping("/movies")와 동일
@Controller('movies')
export class MoviesController {
  //index
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // pathVariable
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one movie. movieId : ${id}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    return `This will delete a movie. movieId: ${id}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch a movie. movieId: ${movieId}`;
  }
}
