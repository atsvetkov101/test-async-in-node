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

describe('Тесты для IoC', function() {
  describe('Набор тестов для IoC', function() {
    before(() => {
      new InitCommand().execute();
    });
    it('Метод Resolve без аргументов', function() {

      const straightMoveCommand = IoC.Resolve<StraightMoveCommand>('StraightMoveCommand');
      expect(straightMoveCommand, 'command StraightMoveCommand is undefined').not.to.be.undefined;
      expect(straightMoveCommand, 'command StraightMoveCommand is null').not.to.be.null;

      const object = new GameObject();
      object.setLocation(new Point(2,3));
      object.setVelocity(new Point(1,0));

      straightMoveCommand.setTarget(object);

      straightMoveCommand.execute();

      expect(object.getLocation().x).equals(3);
      expect(object.getLocation().y).equals(3);

      expect(main()).to.equal('Выполнение завершено');
    });
    it('Метод Resolve с одним аргументом', function() {

      const сommand = IoC.Resolve<TeleportationCommand>('TeleportationCommand', new Point(10,10));
      expect(сommand, 'command TeleportationCommand is undefined').not.to.be.undefined;
      expect(сommand, 'command TeleportationCommand is null').not.to.be.null;

      const object = new GameObject();
      object.setLocation(new Point(2,3));
      object.setVelocity(new Point(1,0));

      сommand.setTarget(object);

      сommand.execute();

      expect(object.getLocation().x).equals(10);
      expect(object.getLocation().y).equals(10);

      expect(main()).to.equal('Выполнение завершено');
    });
    it('Метод Resolve с несколькими аргументами', function() {

      IoC.Resolve<ICommand>('IoC.Register', 'ManyArgumentsCommand', (...args) => {
        return new ManyArgumentsCommand(args);
      }).execute();

      const command = IoC.Resolve<ManyArgumentsCommand>('ManyArgumentsCommand', 
        new Point(10,10),
        new Vector(5,5),
        101,
        'Hello world', 
        (a: number, b: number) => {
          return a + b;
        },
        202
      );
      expect(command, 'command ManyArgumentsCommand is undefined').not.to.be.undefined;
      expect(command, 'command ManyArgumentsCommand is null').not.to.be.null;
      const commandArgs = command.getArgs();
      expect(commandArgs).to.have.length(6);
      expect(typeof commandArgs[0]).equals('object');
      expect(typeof commandArgs[1]).equals('object');
      expect(typeof commandArgs[2]).equals('number');
      expect(typeof commandArgs[3]).equals('string');
      expect(typeof commandArgs[4]).equals('function');
      expect(typeof commandArgs[5]).equals('number');

      
      expect(main()).to.equal('Выполнение завершено');

    });
  });
});