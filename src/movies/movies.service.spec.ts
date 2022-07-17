import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should be return a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'gore', 'romance'],
        year: 2000,
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('999에 해당하는 영화를 찾지 못했습니다.');
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'gore', 'romance'],
        year: 2000,
      });
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(allMovies.length - 1);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('999에 해당하는 영화를 찾지 못했습니다.');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'gore', 'romance'],
        year: 2000,
      });

      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        genres: ['Action', 'gore', 'romance'],
        year: 2000,
      });

      service.update(1, { title: 'updated Test' });
      const afterMovie = service.getOne(1);

      expect(afterMovie.title).toEqual('updated Test');
    });

    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual('999에 해당하는 영화를 찾지 못했습니다.');
      }
    });
  });
});
