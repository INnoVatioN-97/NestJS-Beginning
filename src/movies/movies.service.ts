import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));

    if (!movie) {
      throw new NotFoundException(`${id}에 해당하는 영화를 찾지 못했습니다.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    // 지우려는 영화가 있는지 먼저 조회. 없으면 Error 발생할것
    this.getOne(id);

    this.movies.filter((movie) => movie.id !== parseInt(id));
  }

  createMovie(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });

    return this.movies[this.movies.length - 1];
  }

  update(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });
  }
}
