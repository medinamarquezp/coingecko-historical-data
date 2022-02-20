import { Module } from '@nestjs/common';
import { TokenModule } from 'src/tokens/token.module';
import { CommandsConsole } from './commands.console';

@Module({
  imports: [TokenModule],
  providers: [CommandsConsole],
})
export class CommandsModule {}
