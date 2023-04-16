export interface UserAsAuthor {
    id:number,
    name: string,
    surname: string,
    email: string,
    rating: number,
}

export interface User extends UserAsAuthor {
    password?: string,
    isActivated: boolean,
    activation_link: string,
}
