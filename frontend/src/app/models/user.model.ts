export interface User {
    uid: string;
    name: string;
    email: string;
    favorites:  {[key: string]: string};
  }
