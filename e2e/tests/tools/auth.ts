import * as fs from 'fs';
import * as path from 'path';
import { E2EUser } from '../types/e2e-user';


export class Auth {
  readonly #logins: Record<string, E2EUser>;
  constructor() {
    const internalUrl = path.join('./users.json');
    try {
      this.#logins = JSON.parse(
        fs.readFileSync(internalUrl, {
          encoding: 'utf-8',
        })
      );
    } catch (e) {
      console.error(e);
      throw new Error(
        `file ${internalUrl} not found. Fix it by duplicating users.tpl.json and filling in the values, ${e}`
      );
    }
  }

  getUser(name: string): E2EUser {
    if (!this.#logins[name]) {
      throw new Error(`Did not find info for user ${name}`);
    }
    return this.#logins[name];
  }
}