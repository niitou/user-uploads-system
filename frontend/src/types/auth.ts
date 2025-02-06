export interface User {
    name: string;
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
  }