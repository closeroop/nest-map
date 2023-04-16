import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './filter/http-exception/http-exception.filter';
import { ResponseInterceptor } from './interceptor/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 捕获全局异常
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // 响应拦截  格式化内容
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
