import { ICommand } from './interfaces/icommand';

export class ManyArgumentsCommand implements ICommand{
  constructor_args;
  constructor(...args){
    this.constructor_args = args[0];
  }
  execute(): void {
    // do nothing;
  }
  getType(): string {
    return 'ManyArgumentsCommand';
  }

  getArgs(){
    return this.constructor_args;
  }
}
