import { expect, assert } from 'chai';
import { IoC } from '../src/ioc/ioc';
import { main } from '../src';
import { StraightMoveCommand } from '../src/straight-move-command';
import { GameObject } from '../src/game-object';
import { Point } from '../src/point';
import { TeleportationCommand } from '../src/teleportation-command';
import { ManyArgumentsCommand } from '../src/many-arguments-command';
import { Vector } from '../src/vector';
import { InitCommand } from '../src/scopes/init-command';
import { ICommand } from '../src/interfaces/icommand';

describe('Тесты для init-command', function() {
  describe('Набор тестов для init-command', function() {
    it('IoC без инициализации', function() {
      let straightMoveCommand;
      let caughtError;
      try{
        straightMoveCommand = IoC.Resolve<StraightMoveCommand>('StraightMoveCommand');
      } catch (e) {
        caughtError = e;
      }
      expect(caughtError, 'Ошибок не происходило. caughtError is undefined').to.be.undefined;
      expect(straightMoveCommand, 'Объект не бы разрешен. StraightMoveCommand is undefined').to.be.null;
    });
  });
  describe('Набор тестов для init-command #2', function() {
    before(() => {
      new InitCommand().execute();
    });
    it('IoC с инициализацией', function() {
      let straightMoveCommand;
      let caughtError;
      try{
        straightMoveCommand = IoC.Resolve<StraightMoveCommand>('StraightMoveCommand');
      } catch (e) {
        caughtError = e;
      }
      expect(caughtError, 'Ошибок не происходило. caughtError is undefined').to.be.undefined;
      expect(straightMoveCommand, 'Объект не бы разрешен. StraightMoveCommand is undefined').to.be.not.null;
      expect(straightMoveCommand, 'Объект не бы разрешен. StraightMoveCommand is undefined').to.be.not.undefined;
    });
    it('IoC скоуп по-умолчанию \'default\'', function() {
      const scope = IoC.Resolve<string>('IoC.Scope.Current');
      expect(scope, 'IoC скоуп по-умолчанию \'default\'').equals('default');
    });
    it('IoC устанавливаем скоуп', function() {
      IoC.Resolve('IoC.Scope.Current.Set', 'myscope').execute();
      const currentScope = IoC.Resolve<string>('IoC.Scope.Current');
      expect(currentScope).equals('myscope');
    });
    it('IoC устанавливаем скоуп. Регистрируем зависимость в скоупе. Проверяем, что разрешается.', function() {
      IoC.Resolve('IoC.Scope.Current.Set', 'myscope1').execute();
      IoC.Resolve<ICommand>('IoC.Register', 'ManyArgumentsCommand', (...args) => {
        return new ManyArgumentsCommand(args);
      }).execute();

      const command = IoC.Resolve<ManyArgumentsCommand>('ManyArgumentsCommand', 
        new Point(10,10),
        new Vector(5,5)
      );
      expect(command, 'command ManyArgumentsCommand is undefined').not.to.be.undefined;
      expect(command, 'command ManyArgumentsCommand is null').not.to.be.null;
    });
    // eslint-disable-next-line max-len
    it('IoC устанавливаем скоуп. Регистрируем зависимость в скоупе. Проверяем, что не разрешается в другом скоупе.', function() {
      IoC.Resolve('IoC.Scope.Current.Set', 'scope1').execute();
      IoC.Resolve<ICommand>('IoC.Register', 'ManyArgumentsCommand', (...args) => {
        return new ManyArgumentsCommand(args);
      }).execute();
      IoC.Resolve('IoC.Scope.Current.Set', 'scope2').execute();
      const command = IoC.Resolve<ManyArgumentsCommand>('ManyArgumentsCommand', 
        new Point(10,10),
        new Vector(5,5)
      );
      expect(command, 'command ManyArgumentsCommand is null').to.be.null;
    });
  });
});