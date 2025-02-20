export interface Profile {
    id : number,
    username : string
}

export interface User {
    id : number
    profile : Profile
}

export interface File {
    id : number,
    filename : string
}

export interface Post {
    id : number,
    title : string,
    description : string,
    created_at : string
    user : User | null
    files : File[]
}