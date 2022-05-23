export interface User {
    id: string;
    name: string;
    email: string;
    favorites:  {[key: string]: string};
  }
