import { logger } from './logger';
import { Point } from './point';
import { Vector } from './vector';

export class BaseCommand {
  target: any;
  verbose: boolean;
  constructor(){
    this.verbose = process.env.VERBOSE_LOGGING == 'true';
  }
  logTarget() {
    if(this.target && this.verbose) {
      const point: Point = this.target?.getLocation();
      const vector: Vector = this.target?.getVelocity();
      logger.log(`Point: ${point.toString() || '-'} vector: ${vector.toString() || '-'}`);
    }
  }
}