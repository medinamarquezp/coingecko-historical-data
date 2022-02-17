import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TokensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
