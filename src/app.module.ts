import { Module, HttpModule, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AuthMiddleware } from './auth/auth.middleware'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({ path: 'user/profile', method: RequestMethod.GET })
  }
}
