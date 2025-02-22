import { ICommand } from '../interfaces/icommand';
import { IoC } from '../ioc/ioc';

export class SetCurrentScopeCommand implements ICommand{

  scope: string;
  constructor(scope) {
    this.scope = scope;
  }
  execute(): void {
    IoC.setCurrenScope(this.scope);
  }
  getType(): string {
    return 'SetCurrentScopeCommand';
  }

}