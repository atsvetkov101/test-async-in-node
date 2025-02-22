import { expect, assert } from 'chai';
import { IoC } from '../src/ioc/ioc';
import { InitCommand } from '../src/scopes/init-command';

const setAndCheckScopeFunc = async (scope) => {
  return new Promise((resolve, reject) => {
    IoC.Resolve('IoC.Scope.Current.Set', scope).execute();
    let counter = 0;
    const funcId = Math.round(Math.random() * 100000);
    const myTimer = setInterval(() => {
      const currentScope = IoC.Resolve('IoC.Scope.Current');
      console.log(`func${funcId} iteration:${counter} currentScope:${currentScope}`);
      counter++;
      if(counter > 5){
        clearInterval(myTimer);
        resolve(currentScope);
      }
    },
    1000);
  });
};

describe('Тесты для многопоточности для IoC', function() {
  describe('Набор тестов для многопоточности для IoC', function() {
    before(() => {
      new InitCommand().execute();
    });
    it('Одна функция проверяем скоуп. default скоуп', async function() {

      const func1 = new Promise((resolve, reject) => {
        let counter = 0;
        const myTimer = setInterval(() => {
          const currentScope = IoC.Resolve('IoC.Scope.Current');
          console.log(`func1 iteration:${counter} currentScope:${currentScope}`);
          counter++;
          if(counter > 5){
            clearInterval(myTimer);
            resolve(currentScope);
          }
        },
        1000);
      });
      
      const res = await Promise.all([func1]);
      expect(res[0]).equals('default');
    });

    it('Одна функция проверяем скоуп. mytestscope скоуп', async function() {
      const res = await Promise.all([setAndCheckScopeFunc('mytestscope')]);
      expect(res[0]).equals('mytestscope');
    });

    it('IoC. скоупы mytestscope1 и mytestscope2', async function() {
      const res = await Promise.all([setAndCheckScopeFunc('mytestscope1'), setAndCheckScopeFunc('mytestscope2')]);
      expect(res[0]).equals('mytestscope1');
      expect(res[1]).equals('mytestscope2');
    });
  });
});