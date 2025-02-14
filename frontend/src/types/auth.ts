export interface User {
    user_id : number
    profile_id : number
    avatar : string | null
    username : string
  }
  
  export interface AuthState {
    token: string | null;
    user: User | null;
  }