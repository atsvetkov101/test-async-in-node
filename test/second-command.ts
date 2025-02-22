import { ICommand } from '../src/interfaces/icommand';

export class SecondCommand implements ICommand {
  args;
  constructor(...args){
    this.args = args[0];
  }
  execute(): void {
    throw new Error('Method not implemented.');
  }
  getType(): string {
    return 'SecondCommand';
  }
}