export interface User {
    id: string;
    name: string;
    email: string;
    favorites:  {[id: string]: string;};
  }
