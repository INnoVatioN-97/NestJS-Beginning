import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Decorator에 적혀있지 않은 값들은 통과 X
      forbidNonWhitelisted: true, // DTO 등에 명시되지 않은 값 들어오면 아예 에러나도록
      transform: true, // url타고 온 값들을 실제 우리가 원하는 값으로 바꿔준다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
