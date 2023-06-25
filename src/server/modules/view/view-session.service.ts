import { Injectable, Logger } from '@nestjs/common';
import { LazyObjectParameter } from '../../utilities/LazyObjectParameter';

@Injectable()
export class ViewSessionService {

  private readonly logger = new Logger(ViewSessionService.name);

  localSession = new Map<string, any>();

  put(value: any): string {
    const sessionId = this._makeid(10);
    this.logger.verbose(`Inserting new session ${sessionId}`);
    this.logger.verbose('Session Value: ', new LazyObjectParameter(value));
    this.localSession.set(sessionId, value);
    return sessionId;
  }

  remove(sessionId: string): void {
    const removed = this.localSession.delete(sessionId);
    if (!removed) {
      this.logger.warn(`Failed to remove session with id ${sessionId}`);
    }
  }

  getOrThrow(sessionId: string): any {
    const session = this.get(sessionId);
    if (session != undefined) {
      return session;
    } else {
      this.logger.verbose(`Failed to fetch session with id ${sessionId} current session state: `, new LazyObjectParameter(this.localSession));
      throw new Error(`Session with id ${sessionId} was not found`);
    }
  }

  get(sessionId: string): any | undefined {
    this.logger.log(`Attempting to retrieve session with id: ${sessionId}`);
    return this.localSession.get(sessionId);
  }


  private _makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
