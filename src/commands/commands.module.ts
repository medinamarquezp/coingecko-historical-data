import { Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';
import { CommandsConsole } from './commands.console';

@Module({
  imports: [TokensModule],
  providers: [CommandsConsole],
})
export class CommandsModule {}
