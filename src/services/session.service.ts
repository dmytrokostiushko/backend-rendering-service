class SessionService {
  sessionMap: Record<string, any> = {};


  constructor() {
    this.sessionMap['test'] = 'resp';
  }

  put(key: string, value: any) {
    console.log('Adding new key: ' + key);
    this.sessionMap[key] = value;
  }

  get(key: string): any {
    console.log('Searching for key: ' + key);
    return this.sessionMap[key];
  }

  remove(session_id: string) {
    console.log('Removing session id: ' + session_id);
    delete this.sessionMap[session_id];
  }
}


export const SESSION_INSTANCE = new SessionService();
