export interface User {
    name: string;
    profile_id : number | null
    avatar : string | null
    username : string | null
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
  }