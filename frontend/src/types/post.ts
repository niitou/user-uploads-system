export interface Profile {
    id : number,
    username : string
}

export interface User {
    id : number
    profile : Profile
}

export interface Post {
    id : number,
    title : string,
    description : string,
    user : User | null
    files : File[] | null
}