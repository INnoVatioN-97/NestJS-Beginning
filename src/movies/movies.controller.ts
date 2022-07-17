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

// Spring에서의 @RequestMapping("/movies")와 동일
@Controller('movies')
export class MoviesController {
  //index
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie with a searchingYear ${searchingYear}`;
  }
  // pathVariable
  @Get(':id')
  getOne(@Param('id') id: string) {
    return `This will return one movie. movieId : ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    return 'This will create a movie. requestBody: ' + movieData;
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return `This will delete a movie. movieId: ${id}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
