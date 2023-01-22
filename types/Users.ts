export interface User {
    id:number,
    name?: string,
    surname?: string,
    email: string,
    password?: string,
    isActivated: boolean,
    activation_link: string,
    rating: number,
}
