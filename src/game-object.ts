import { ILocation } from './interfaces/ilocation';
import { IMovable } from './interfaces/imovable';
import { IMoving } from './interfaces/imoving';
import { IRotatable } from './interfaces/irotatable';
import { Point } from './point';
import { Vector } from './vector';

class GameObjectParams {
  position?: Point;
  velocity?: Vector;
}

export class GameObject implements IMovable, IRotatable, ILocation, IMoving {
  position?: Point;
  velocity?: Vector;
  constructor(params: GameObjectParams = {} as GameObjectParams ) {
    const { 
      position = undefined, 
      velocity = undefined 
    } = params;

    this.position = position;
    this.velocity = velocity;
  }

  getLocation(): Point{
    return this.position;
  }

  setLocation(newPosition: Point): void {
    this.position = newPosition;
  }
  
  getVelocity(): Vector {
    return this.velocity;
  }

  setVelocity(newVelocity: Vector): void {
    this.velocity = newVelocity;
  }

}
