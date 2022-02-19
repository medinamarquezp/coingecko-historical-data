import { Module } from '@nestjs/common';
import { CommandsConsole } from './commands.console';

@Module({
  providers: [CommandsConsole],
})
export class CommandsModule {}
