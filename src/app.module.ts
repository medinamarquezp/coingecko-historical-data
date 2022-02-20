import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from './tokens/tokens.module';
import { typeormConfig } from './config/typeorm.config';
import { ConsoleModule } from 'nestjs-console';
import { CommandsModule } from './commands/commands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TokensModule,
    ConsoleModule,
    CommandsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
