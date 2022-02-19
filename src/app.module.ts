import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from './token/token.module';
import { typeormConfig } from './config/typeorm.config';
import { ConsoleModule } from 'nestjs-console';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TokenModule,
    ConsoleModule,
    CommandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
